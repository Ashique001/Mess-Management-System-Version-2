using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.Drawing;
using System.Drawing.Drawing2D;

namespace MessMealManagement
{
    public partial class DashboardForm : Form
    {
        public DashboardForm()
        {
            InitializeComponent();
            LoadTotalMembers();
            LoadTotalDeposit();
            LoadTotalExpense();
            LoadTotalMeals();
            LoadMealRate();
            LoadRecentActivities();
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
        private void LoadTotalMembers()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = "SELECT COUNT(*) FROM Members WHERE Status = 1";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        int totalMembers = Convert.ToInt32(cmd.ExecuteScalar());

                        lblTotalMembers.Text = totalMembers.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to load total members.\n" + ex.Message);
            }
        }

        //for load deposite

        private void LoadTotalDeposit()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = "SELECT ISNULL(SUM(Amount), 0) FROM Deposits";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        decimal totalDeposit = Convert.ToDecimal(cmd.ExecuteScalar());

                        lblTotalDeposit.Text = totalDeposit.ToString("0.00");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to load total deposit.\n" + ex.Message);
            }
        }
        //for load deposite

        //Total Expense

        private void LoadTotalExpense()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                SELECT ISNULL(SUM(Amount), 0)
                FROM MarketExpenses";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        decimal totalExpense = Convert.ToDecimal(
                            cmd.ExecuteScalar()
                        );

                        lblTotalExpense.Text =
                            "৳ " + totalExpense.ToString("N2");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error loading total expense: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        // End of Total Expense

        //Total Meals 

        private void LoadTotalMeals()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                SELECT COUNT(*)
                FROM Meals";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        int totalMeals = Convert.ToInt32(
                            cmd.ExecuteScalar()
                        );

                        lblTotalMeals.Text = totalMeals.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error loading total meals: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        //END of total Meals

        //Meal Rate

        private void LoadMealRate()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                SELECT
                    ISNULL((SELECT SUM(Amount) FROM MarketExpenses), 0)
                    /
                    NULLIF((SELECT COUNT(*) FROM Meals), 0)";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        decimal mealRate = Convert.ToDecimal(
                            cmd.ExecuteScalar()
                        );

                        lblMealRate.Text =
                            "৳ " + mealRate.ToString("N2");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error loading meal rate: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        // End of Meal Rate

        //Recent view

        private void LoadRecentActivities()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                SELECT TOP 15
                    ActivityType,
                    Description,
                    ActivityDate,
                    Amount
                FROM
                (
                    SELECT
                        'Deposit' AS ActivityType,
                        m.Name + ' deposited money' AS Description,
                        d.DepositDate AS ActivityDate,
                        d.Amount AS Amount
                    FROM Deposits d
                    INNER JOIN Members m
                        ON d.MemberID = m.MemberID

                    UNION ALL

                    SELECT
                        'Market Expense' AS ActivityType,
                        ISNULL(me.Description, 'Market expense') AS Description,
                        me.ExpenseDate AS ActivityDate,
                        me.Amount AS Amount
                    FROM MarketExpenses me

                    UNION ALL

                    SELECT
                        'Meal' AS ActivityType,
                        m.Name + ' - ' + ml.MealType AS Description,
                        ml.MealDate AS ActivityDate,
                        CAST(NULL AS DECIMAL(10,2)) AS Amount
                    FROM Meals ml
                    INNER JOIN Members m
                        ON ml.MemberID = m.MemberID
                ) AS RecentActivities

                ORDER BY ActivityDate DESC;
            ";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                        {
                            DataTable dt = new DataTable();

                            adapter.Fill(dt);

                            dgvRecentActivities.DataSource = dt;
                            // time format
                            dgvRecentActivities.Columns["ActivityDate"].DefaultCellStyle.Format = "dd-MM-yyyy";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error loading recent activities: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        //End of recent view
    }
}
