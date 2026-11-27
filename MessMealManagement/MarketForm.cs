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
    public partial class MarketForm : Form
    {
        private int selectedExpenseID = 0;
        public MarketForm()
        {
            InitializeComponent();
            LoadExpenses();
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

        private void LoadExpenses()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                SELECT
                    ExpenseID,
                    ExpenseDate,
                    Amount,
                    Description
                FROM MarketExpenses
                ORDER BY ExpenseDate DESC";

                    using (SqlDataAdapter da = new SqlDataAdapter(query, con))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);

                        dgvExpenses.DataSource = dt;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error loading market expenses: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }



        private void btnSave_Click(object sender, EventArgs e)
        {
            // Amount খালি কিনা check
            if (string.IsNullOrWhiteSpace(txtAmount.Text))
            {
                MessageBox.Show("Please enter amount.");
                txtAmount.Focus();
                return;
            }

            // Amount সঠিক কিনা check
            if (!decimal.TryParse(txtAmount.Text, out decimal amount))
            {
                MessageBox.Show("Please enter a valid amount.");
                txtAmount.Focus();
                return;
            }

            // Description খালি কিনা check
            if (string.IsNullOrWhiteSpace(txtDescription.Text))
            {
                MessageBox.Show("Please enter description.");
                txtDescription.Focus();
                return;
            }

            DateTime expenseDate = dtpExpenseDate.Value.Date;

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                INSERT INTO MarketExpenses
                (
                    ExpenseDate,
                    Amount,
                    Description
                )
                VALUES
                (
                    @ExpenseDate,
                    @Amount,
                    @Description
                )";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@ExpenseDate", expenseDate);
                        cmd.Parameters.AddWithValue("@Amount", amount);
                        cmd.Parameters.AddWithValue("@Description", txtDescription.Text.Trim());

                        cmd.ExecuteNonQuery();
                    }
                }

                MessageBox.Show(
                    "Market expense saved successfully.",
                    "Success",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information
                );

                // Grid refresh
                LoadExpenses();

                // Input fields clear
                txtAmount.Clear();
                txtDescription.Clear();

                // Date আবার আজকের date
                dtpExpenseDate.Value = DateTime.Now;
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error saving market expense: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        //dgv theke data box e nia asha
        private void dgvExpenses_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0)
                return;

            DataGridViewRow row = dgvExpenses.Rows[e.RowIndex];

            selectedExpenseID = Convert.ToInt32(
                row.Cells["ExpenseID"].Value
            );

            dtpExpenseDate.Value = Convert.ToDateTime(
                row.Cells["ExpenseDate"].Value
            );

            txtAmount.Text = row.Cells["Amount"].Value.ToString();

            txtDescription.Text = row.Cells["Description"].Value.ToString();
        }

        //Update button code 
        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (selectedExpenseID == 0)
            {
                MessageBox.Show(
                    "Please select an expense to update."
                );
                return;
            }

            if (string.IsNullOrWhiteSpace(txtAmount.Text))
            {
                MessageBox.Show("Please enter amount.");
                txtAmount.Focus();
                return;
            }

            if (!decimal.TryParse(txtAmount.Text, out decimal amount))
            {
                MessageBox.Show("Please enter a valid amount.");
                txtAmount.Focus();
                return;
            }

            if (string.IsNullOrWhiteSpace(txtDescription.Text))
            {
                MessageBox.Show("Please enter description.");
                txtDescription.Focus();
                return;
            }

            DateTime expenseDate = dtpExpenseDate.Value.Date;

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                UPDATE MarketExpenses
                SET
                    ExpenseDate = @ExpenseDate,
                    Amount = @Amount,
                    Description = @Description
                WHERE ExpenseID = @ExpenseID";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue(
                            "@ExpenseDate",
                            expenseDate
                        );

                        cmd.Parameters.AddWithValue(
                            "@Amount",
                            amount
                        );

                        cmd.Parameters.AddWithValue(
                            "@Description",
                            txtDescription.Text.Trim()
                        );

                        cmd.Parameters.AddWithValue(
                            "@ExpenseID",
                            selectedExpenseID
                        );

                        cmd.ExecuteNonQuery();
                    }
                }

                MessageBox.Show(
                    "Market expense updated successfully.",
                    "Success",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information
                );

                LoadExpenses();

                // Clear selection
                selectedExpenseID = 0;

                txtAmount.Clear();
                txtDescription.Clear();

                dtpExpenseDate.Value = DateTime.Now;
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error updating market expense: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        //button DELETE
        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (selectedExpenseID == 0)
            {
                MessageBox.Show(
                    "Please select an expense to delete.",
                    "Warning",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning
                );

                return;
            }

            DialogResult result = MessageBox.Show(
                "Are you sure you want to delete this expense?",
                "Confirm Delete",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Question
            );

            if (result != DialogResult.Yes)
            {
                return;
            }

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                DELETE FROM MarketExpenses
                WHERE ExpenseID = @ExpenseID";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue(
                            "@ExpenseID",
                            selectedExpenseID
                        );

                        cmd.ExecuteNonQuery();
                    }
                }

                MessageBox.Show(
                    "Market expense deleted successfully.",
                    "Success",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information
                );

                // Refresh Grid
                LoadExpenses();

                // Clear selected ID
                selectedExpenseID = 0;

                // Clear input fields
                txtAmount.Clear();
                txtDescription.Clear();

                dtpExpenseDate.Value = DateTime.Now;
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error deleting market expense: " + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }

        // Button CLear
        private void btnClear_Click(object sender, EventArgs e)
        {
            // Clear selected expense
            selectedExpenseID = 0;

            // Clear amount
            txtAmount.Clear();

            // Clear description
            txtDescription.Clear();

            // Reset date to today
            dtpExpenseDate.Value = DateTime.Now;

            // Put cursor in amount textbox
            txtAmount.Focus();
        }
    }
}
