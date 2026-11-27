using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;


using System.Drawing;
using System.Drawing.Drawing2D;

namespace MessMealManagement
{
    public partial class ReportForm : Form
    {
        public ReportForm()
        {
            InitializeComponent();
        }

        //For gradient color

        protected override void OnPaintBackground(PaintEventArgs e)
        {
            using (SolidBrush brush = new SolidBrush(Color.FromArgb(248, 250, 252)))
            {
                e.Graphics.FillRectangle(brush, this.ClientRectangle);
            }
        }

        //For gradient color

        //button Calculate
        private void btnCalculate_Click(object sender, EventArgs e)
        {
            DateTime fromDate = dtpFrom.Value.Date;
            DateTime toDate = dtpTo.Value.Date;

            if (fromDate > toDate)
            {
                MessageBox.Show(
                    "From date cannot be greater than To date.",
                    "Warning",
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

                    // Total Market Cost
                    string expenseQuery = @"
                SELECT ISNULL(SUM(Amount), 0)
                FROM MarketExpenses
                WHERE ExpenseDate BETWEEN @FromDate AND @ToDate";

                    decimal totalMarketCost;

                    using (SqlCommand cmd = new SqlCommand(expenseQuery, con))
                    {
                        cmd.Parameters.AddWithValue("@FromDate", fromDate);
                        cmd.Parameters.AddWithValue("@ToDate", toDate);

                        totalMarketCost = Convert.ToDecimal(
                            cmd.ExecuteScalar()
                        );
                    }

                    // Total Meals
                    string mealQuery = @"
                SELECT COUNT(*)
                FROM Meals
                WHERE MealDate BETWEEN @FromDate AND @ToDate";

                    int totalMeals;

                    using (SqlCommand cmd = new SqlCommand(mealQuery, con))
                    {
                        cmd.Parameters.AddWithValue("@FromDate", fromDate);
                        cmd.Parameters.AddWithValue("@ToDate", toDate);

                        totalMeals = Convert.ToInt32(
                            cmd.ExecuteScalar()
                        );
                    }

                    // Meal Rate
                    decimal mealRate = 0;

                    if (totalMeals > 0)
                    {
                        mealRate = totalMarketCost / totalMeals;
                    }

                    // Show results
                    lblTotalMarketCost.Text =
                        "৳ " + totalMarketCost.ToString("N2");

                    lblTotalMeals.Text =
                        totalMeals.ToString();

                    lblMealRate.Text =
                        "৳ " + mealRate.ToString("N2");

                    //query For Grid view

                    string memberQuery = @"
    SELECT
        m.Name AS Member,

        ISNULL(
            (
                SELECT COUNT(*)
                FROM Meals meal
                WHERE meal.MemberID = m.MemberID
                AND meal.MealDate BETWEEN @FromDate AND @ToDate
            ),
            0
        ) AS Meals,

        ISNULL(
            (
                SELECT COUNT(*)
                FROM Meals meal
                WHERE meal.MemberID = m.MemberID
                AND meal.MealDate BETWEEN @FromDate AND @ToDate
            ),
            0
        ) * @MealRate AS Cost,

        ISNULL(
            (
                SELECT SUM(d.Amount)
                FROM Deposits d
                WHERE d.MemberID = m.MemberID
                AND d.DepositDate BETWEEN @FromDate AND @ToDate
            ),
            0
        ) AS Deposit,

        ISNULL(
            (
                SELECT SUM(d.Amount)
                FROM Deposits d
                WHERE d.MemberID = m.MemberID
                AND d.DepositDate BETWEEN @FromDate AND @ToDate
            ),
            0
        )
        -
        (
            ISNULL(
                (
                    SELECT COUNT(*)
                    FROM Meals meal
                    WHERE meal.MemberID = m.MemberID
                    AND meal.MealDate BETWEEN @FromDate AND @ToDate
                ),
                0
            ) * @MealRate
        ) AS Balance

    FROM Members m

    WHERE m.Status = 1

    ORDER BY m.Name";

                    using (SqlCommand cmd = new SqlCommand(memberQuery, con))
                    {
                        cmd.Parameters.AddWithValue("@FromDate", fromDate);
                        cmd.Parameters.AddWithValue("@ToDate", toDate);
                        cmd.Parameters.AddWithValue("@MealRate", mealRate);

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            DataTable dt = new DataTable();
                            da.Fill(dt);

                            dgvReport.DataSource = dt;

                            //Maintain decimal value
                            dgvReport.Columns["Cost"].DefaultCellStyle.Format = "N2";
                            dgvReport.Columns["Deposit"].DefaultCellStyle.Format = "N2";
                            dgvReport.Columns["Balance"].DefaultCellStyle.Format = "N2";
                            // End Maintain decimal value
                        }
                    }

                    //End of Query for Grid View
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error calculating report: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }
        //end of button calculate
    }
}
