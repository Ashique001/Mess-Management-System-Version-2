using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;

namespace MessMealManagement
{
    public partial class MonthlyOverviewForm : Form
    {
        private bool isUpdating = false;

        public MonthlyOverviewForm()
        {
            InitializeComponent();

            isUpdating = true;
            // Default date range: 1st day of current month to today
            DateTime today = DateTime.Today;
            dtpFrom.Value = new DateTime(today.Year, today.Month, 1);
            dtpTo.Value = today;
            isUpdating = false;

            LoadMonthlyData();
        }

        private void DateFilter_ValueChanged(object sender, EventArgs e)
        {
            if (!isUpdating)
            {
                LoadMonthlyData();
            }
        }

        private void btnThisMonth_Click(object sender, EventArgs e)
        {
            isUpdating = true;
            DateTime today = DateTime.Today;
            dtpFrom.Value = new DateTime(today.Year, today.Month, 1);
            int lastDay = DateTime.DaysInMonth(today.Year, today.Month);
            dtpTo.Value = new DateTime(today.Year, today.Month, lastDay);
            isUpdating = false;

            LoadMonthlyData();
        }

        private void btnRefresh_Click(object sender, EventArgs e)
        {
            LoadMonthlyData();
        }

        public void LoadMonthlyData()
        {
            DateTime fromDate = dtpFrom.Value.Date;
            DateTime toDate = dtpTo.Value.Date;

            if (fromDate > toDate)
            {
                MessageBox.Show(
                    "The 'From' date cannot be greater than the 'To' date.",
                    "Invalid Date Range",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning
                );
                return;
            }

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    // 1. Total Market Cost
                    decimal totalMarketCost = 0;
                    string expenseQuery = @"
                        SELECT ISNULL(SUM(Amount), 0)
                        FROM MarketExpenses
                        WHERE ExpenseDate BETWEEN @FromDate AND @ToDate";

                    using (SqlCommand cmd = new SqlCommand(expenseQuery, con))
                    {
                        cmd.Parameters.AddWithValue("@FromDate", fromDate);
                        cmd.Parameters.AddWithValue("@ToDate", toDate);
                        totalMarketCost = Convert.ToDecimal(cmd.ExecuteScalar());
                    }

                    // 2. Total Meals in Range
                    int totalMealsCount = 0;
                    string totalMealsQuery = @"
                        SELECT COUNT(*)
                        FROM Meals
                        WHERE MealDate BETWEEN @FromDate AND @ToDate";

                    using (SqlCommand cmd = new SqlCommand(totalMealsQuery, con))
                    {
                        cmd.Parameters.AddWithValue("@FromDate", fromDate);
                        cmd.Parameters.AddWithValue("@ToDate", toDate);
                        totalMealsCount = Convert.ToInt32(cmd.ExecuteScalar());
                    }

                    // 3. Active Members Count
                    int activeMembersCount = 0;
                    string activeMembersQuery = "SELECT COUNT(*) FROM Members WHERE Status = 1";
                    using (SqlCommand cmd = new SqlCommand(activeMembersQuery, con))
                    {
                        activeMembersCount = Convert.ToInt32(cmd.ExecuteScalar());
                    }

                    // 4. Calculate Meal Rate
                    decimal mealRate = 0;
                    if (totalMealsCount > 0)
                    {
                        mealRate = totalMarketCost / totalMealsCount;
                    }

                    // Update Top KPI Cards
                    lblTotalMeals.Text = totalMealsCount.ToString();
                    lblTotalMarket.Text = "৳ " + totalMarketCost.ToString("N2");
                    lblMealRate.Text = "৳ " + mealRate.ToString("N2");
                    lblActiveMembers.Text = activeMembersCount.ToString();

                    // 5. Load Member Summary Table (Tab 1)
                    LoadMemberSummaryTable(con, fromDate, toDate, totalMealsCount);

                    // 6. Load Dynamic Daily Meal Matrix Sheet (Tab 2)
                    LoadDailyMatrixSheet(con, fromDate, toDate);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Failed to load monthly overview data:\n" + ex.Message,
                    "Database Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        private void LoadMemberSummaryTable(SqlConnection con, DateTime fromDate, DateTime toDate, int grandTotalMeals)
        {
            string summaryQuery = @"
                SELECT 
                    m.Name AS [Member Name],
                    ISNULL(SUM(CASE WHEN ml.MealType = 'Lunch' THEN 1 ELSE 0 END), 0) AS [Total Lunch],
                    ISNULL(SUM(CASE WHEN ml.MealType = 'Dinner' THEN 1 ELSE 0 END), 0) AS [Total Dinner],
                    ISNULL(SUM(CASE WHEN ml.MealType IN ('Lunch', 'Dinner') THEN 1 ELSE 0 END), 0) AS [Total Meals]
                FROM Members m
                LEFT JOIN Meals ml ON m.MemberID = ml.MemberID 
                    AND ml.MealDate BETWEEN @FromDate AND @ToDate
                WHERE m.Status = 1
                GROUP BY m.MemberID, m.Name
                ORDER BY m.Name;";

            using (SqlCommand cmd = new SqlCommand(summaryQuery, con))
            {
                cmd.Parameters.AddWithValue("@FromDate", fromDate);
                cmd.Parameters.AddWithValue("@ToDate", toDate);

                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adapter.Fill(dt);

                // Add analytical column: Consumption Share (%)
                dt.Columns.Add("Meal Share", typeof(string));

                foreach (DataRow row in dt.Rows)
                {
                    int memberMeals = Convert.ToInt32(row["Total Meals"]);
                    double share = grandTotalMeals > 0 ? ((double)memberMeals / grandTotalMeals) * 100 : 0;
                    row["Meal Share"] = share.ToString("0.0") + " %";
                }

                dgvMemberSummary.DataSource = dt;
            }
        }

        private void LoadDailyMatrixSheet(SqlConnection con, DateTime fromDate, DateTime toDate)
        {
            // 1. Fetch all active members in order
            List<(int ID, string Name)> members = new List<(int, string)>();
            string membersQuery = "SELECT MemberID, Name FROM Members WHERE Status = 1 ORDER BY Name;";
            using (SqlCommand cmd = new SqlCommand(membersQuery, con))
            {
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        members.Add((reader.GetInt32(0), reader.GetString(1)));
                    }
                }
            }

            // 2. Fetch all meals in the date range
            HashSet<string> mealSet = new HashSet<string>();
            string mealsQuery = @"
                SELECT MemberID, MealDate, MealType
                FROM Meals
                WHERE MealDate BETWEEN @FromDate AND @ToDate;";

            using (SqlCommand cmd = new SqlCommand(mealsQuery, con))
            {
                cmd.Parameters.AddWithValue("@FromDate", fromDate);
                cmd.Parameters.AddWithValue("@ToDate", toDate);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int mId = reader.GetInt32(0);
                        DateTime mDate = reader.GetDateTime(1).Date;
                        string mType = reader.GetString(2);
                        // Unique lookup key: "MemberID_yyyyMMdd_MealType"
                        mealSet.Add($"{mId}_{mDate:yyyyMMdd}_{mType}");
                    }
                }
            }

            // 3. Construct Matrix DataTable
            DataTable dtMatrix = new DataTable();
            dtMatrix.Columns.Add("তারিখ (Date)", typeof(string));

            // Add Lunch (D) and Dinner (N) columns for each member
            foreach (var member in members)
            {
                dtMatrix.Columns.Add($"{member.Name} (D)", typeof(int));
                dtMatrix.Columns.Add($"{member.Name} (N)", typeof(int));
            }

            dtMatrix.Columns.Add("দৈনিক মোট (Total)", typeof(int));

            // Running totals for summary row
            int[] memberLunchTotals = new int[members.Count];
            int[] memberDinnerTotals = new int[members.Count];
            int grandTotalMeals = 0;

            // 4. Populate each date row from fromDate to toDate
            for (DateTime curr = fromDate; curr <= toDate; curr = curr.AddDays(1))
            {
                DataRow row = dtMatrix.NewRow();
                row["তারিখ (Date)"] = curr.ToString("dd-MM-yyyy (ddd)");

                int dayMealsCount = 0;

                for (int i = 0; i < members.Count; i++)
                {
                    int mId = members[i].ID;
                    string lunchKey = $"{mId}_{curr:yyyyMMdd}_Lunch";
                    string dinnerKey = $"{mId}_{curr:yyyyMMdd}_Dinner";

                    int lunchVal = mealSet.Contains(lunchKey) ? 1 : 0;
                    int dinnerVal = mealSet.Contains(dinnerKey) ? 1 : 0;

                    row[$"{members[i].Name} (D)"] = lunchVal;
                    row[$"{members[i].Name} (N)"] = dinnerVal;

                    memberLunchTotals[i] += lunchVal;
                    memberDinnerTotals[i] += dinnerVal;

                    dayMealsCount += (lunchVal + dinnerVal);
                }

                row["দৈনিক মোট (Total)"] = dayMealsCount;
                grandTotalMeals += dayMealsCount;

                dtMatrix.Rows.Add(row);
            }

            // 5. Add Bottom Summary Row
            DataRow summaryRow = dtMatrix.NewRow();
            summaryRow["তারিখ (Date)"] = "মোট মিল (Total)";
            for (int i = 0; i < members.Count; i++)
            {
                summaryRow[$"{members[i].Name} (D)"] = memberLunchTotals[i];
                summaryRow[$"{members[i].Name} (N)"] = memberDinnerTotals[i];
            }
            summaryRow["দৈনিক মোট (Total)"] = grandTotalMeals;
            dtMatrix.Rows.Add(summaryRow);

            dgvDailyMatrix.DataSource = dtMatrix;

            // ── Column coloring: soft pastel palette, same color for (D) & (N) of same member ──
            var memberColorPalette = new (Color CellBg, Color HeaderBg)[]
            {
                (Color.FromArgb(219, 236, 252), Color.FromArgb(195, 216, 248)), // Sky Blue
                (Color.FromArgb(216, 245, 232), Color.FromArgb(182, 240, 208)), // Mint
                (Color.FromArgb(252, 243, 200), Color.FromArgb(245, 228, 110)), // Amber
                (Color.FromArgb(232, 228, 252), Color.FromArgb(212, 188, 248)), // Lilac
                (Color.FromArgb(252, 224, 226), Color.FromArgb(248, 180, 190)), // Rose
                (Color.FromArgb(220, 248, 242), Color.FromArgb(175, 242, 228)), // Teal
                (Color.FromArgb(252, 234, 214), Color.FromArgb(245, 196, 142)), // Peach
                (Color.FromArgb(232, 238, 244), Color.FromArgb(205, 214, 228))  // Slate
            };

            // Style the Date column
            if (dgvDailyMatrix.Columns.Contains("তারিখ (Date)"))
            {
                var col = dgvDailyMatrix.Columns["তারিখ (Date)"];
                col.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleLeft;
                col.DefaultCellStyle.BackColor = Color.FromArgb(248, 250, 252);
                col.DefaultCellStyle.Font = new Font("Segoe UI Semibold", 9F);
                col.HeaderCell.Style.BackColor = Color.FromArgb(241, 245, 249);
            }

            // Apply matching colors to each member's (D) and (N) columns
            for (int i = 0; i < members.Count; i++)
            {
                var theme = memberColorPalette[i % memberColorPalette.Length];
                string dCol = $"{members[i].Name} (D)";
                string nCol = $"{members[i].Name} (N)";

                if (dgvDailyMatrix.Columns.Contains(dCol))
                {
                    var col = dgvDailyMatrix.Columns[dCol];
                    col.DefaultCellStyle.BackColor = theme.CellBg;
                    col.DefaultCellStyle.ForeColor = Color.FromArgb(15, 23, 42);
                    col.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                    col.HeaderCell.Style.BackColor = theme.HeaderBg;
                    col.HeaderCell.Style.ForeColor = Color.FromArgb(15, 23, 42);
                    col.HeaderCell.Style.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold);
                }

                if (dgvDailyMatrix.Columns.Contains(nCol))
                {
                    var col = dgvDailyMatrix.Columns[nCol];
                    col.DefaultCellStyle.BackColor = theme.CellBg;
                    col.DefaultCellStyle.ForeColor = Color.FromArgb(15, 23, 42);
                    col.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                    col.HeaderCell.Style.BackColor = theme.HeaderBg;
                    col.HeaderCell.Style.ForeColor = Color.FromArgb(15, 23, 42);
                    col.HeaderCell.Style.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold);
                }
            }

            // Style the Daily Total column
            if (dgvDailyMatrix.Columns.Contains("দৈনিক মোট (Total)"))
            {
                var col = dgvDailyMatrix.Columns["দৈনিক মোট (Total)"];
                col.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                col.DefaultCellStyle.BackColor = Color.FromArgb(238, 242, 255);
                col.DefaultCellStyle.ForeColor = Color.FromArgb(29, 78, 216);
                col.DefaultCellStyle.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold);
                col.HeaderCell.Style.BackColor = Color.FromArgb(224, 231, 255);
                col.HeaderCell.Style.ForeColor = Color.FromArgb(30, 58, 138);
            }

            // Highlight the summary row in bold with a distinct background
            if (dgvDailyMatrix.Rows.Count > 0)
            {
                int lastRowIndex = dgvDailyMatrix.Rows.Count - 1;
                DataGridViewRow lastRow = dgvDailyMatrix.Rows[lastRowIndex];
                lastRow.DefaultCellStyle.BackColor = Color.FromArgb(239, 246, 255);
                lastRow.DefaultCellStyle.Font = new Font("Segoe UI", 10F, FontStyle.Bold);
                lastRow.DefaultCellStyle.ForeColor = Color.FromArgb(29, 78, 216);
            }
        }
        private void dgvDailyMatrix_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0 || e.RowIndex >= dgvDailyMatrix.Rows.Count) return;

            // Select the full row
            dgvDailyMatrix.ClearSelection();
            dgvDailyMatrix.Rows[e.RowIndex].Selected = true;
            dgvDailyMatrix.CurrentCell = dgvDailyMatrix.Rows[e.RowIndex].Cells[0];

            // Scroll to make the row visible (centered if possible)
            dgvDailyMatrix.FirstDisplayedScrollingRowIndex =
                Math.Max(0, e.RowIndex - (dgvDailyMatrix.DisplayedRowCount(false) / 2));
        }
    }
}
