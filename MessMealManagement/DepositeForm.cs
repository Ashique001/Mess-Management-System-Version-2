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

namespace MessMealManagement
{
    public partial class DepositeForm : Form
    {
        public DepositeForm()
        {
            InitializeComponent();

            dtpDepositDate.Value = DateTime.Today;

            LoadMembers();
            LoadDeposits();
        }
        //load members

        private void LoadMembers()
        {

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = "SELECT MemberID, Name FROM Members WHERE Status = 1 ORDER BY Name";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        SqlDataAdapter adapter = new SqlDataAdapter(cmd);

                        DataTable dt = new DataTable();
                        adapter.Fill(dt);

                        cmbMember.DataSource = dt;
                        cmbMember.DisplayMember = "Name";
                        cmbMember.ValueMember = "MemberID";
                        cmbMember.SelectedIndex = -1;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to load members.\n" + ex.Message);
            }
        }


        //load members end
        private void ClearFields()
        {
            cmbMember.SelectedIndex = -1;
            dtpDepositDate.Value = DateTime.Today;
            txtAmount.Clear();
        }

        //Deposit DataGridView

        private void LoadDeposits()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                SELECT 
                    d.DepositID,
                    m.Name AS MemberName,
                    d.DepositDate,
                    d.Amount
                FROM Deposits d
                INNER JOIN Members m
                    ON d.MemberID = m.MemberID
                ORDER BY d.DepositDate DESC, d.DepositID DESC";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        SqlDataAdapter adapter = new SqlDataAdapter(cmd);

                        DataTable dt = new DataTable();
                        adapter.Fill(dt);

                        // Automatically generate columns from SQL query
                        dgvDeposits.AutoGenerateColumns = true;

                        // Bind data to DataGridView
                        dgvDeposits.DataSource = null;
                        dgvDeposits.DataSource = dt;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Failed to load deposits.\n" + ex.Message,
                    "Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            }
        }
        //Deposit DataGridView

        //add button
        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (cmbMember.SelectedIndex == -1)
            {
                MessageBox.Show("Please select a member.");
                return;
            }

            if (string.IsNullOrWhiteSpace(txtAmount.Text))
            {
                MessageBox.Show("Please enter deposit amount.");
                return;
            }

            if (!decimal.TryParse(txtAmount.Text, out decimal amount))
            {
                MessageBox.Show("Please enter a valid amount.");
                return;
            }

            if (amount <= 0)
            {
                MessageBox.Show("Amount must be greater than zero.");
                return;
            }

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                INSERT INTO Deposits
                (MemberID, DepositDate, Amount)
                VALUES
                (@MemberID, @DepositDate, @Amount)";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@MemberID", cmbMember.SelectedValue);
                        cmd.Parameters.AddWithValue("@DepositDate", dtpDepositDate.Value.Date);
                        cmd.Parameters.AddWithValue("@Amount", amount);

                        cmd.ExecuteNonQuery();
                    }
                }

                MessageBox.Show("Deposit added successfully!");

                LoadDeposits();
                ClearFields();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to add deposit.\n" + ex.Message);
            }
        }
        //add button

        private int selectedDepositID = 0;

        //load deposite
        private void LoadDepositForEdit(int depositID)
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                SELECT MemberID, DepositDate, Amount
                FROM Deposits
                WHERE DepositID = @DepositID";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@DepositID", depositID);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                cmbMember.SelectedValue = reader["MemberID"];

                                dtpDepositDate.Value =
                                    Convert.ToDateTime(reader["DepositDate"]);

                                txtAmount.Text =
                                    reader["Amount"].ToString();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to load deposit.\n" + ex.Message);
            }
        }
        //load deposite


        //cell click
        private void dgvDeposits_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0)
                return;

            DataGridViewRow row = dgvDeposits.Rows[e.RowIndex];

            selectedDepositID = Convert.ToInt32(
                row.Cells["DepositID"].Value
            );

            LoadDepositForEdit(selectedDepositID);
        }

        //btn update
        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (selectedDepositID == 0)
            {
                MessageBox.Show("Please select a deposit first.");
                return;
            }

            if (cmbMember.SelectedIndex == -1)
            {
                MessageBox.Show("Please select a member.");
                return;
            }

            if (!decimal.TryParse(txtAmount.Text, out decimal amount))
            {
                MessageBox.Show("Please enter a valid amount.");
                return;
            }

            if (amount <= 0)
            {
                MessageBox.Show("Amount must be greater than zero.");
                return;
            }

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                UPDATE Deposits
                SET MemberID = @MemberID,
                    DepositDate = @DepositDate,
                    Amount = @Amount
                WHERE DepositID = @DepositID";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@MemberID", cmbMember.SelectedValue);
                        cmd.Parameters.AddWithValue("@DepositDate", dtpDepositDate.Value.Date);
                        cmd.Parameters.AddWithValue("@Amount", amount);
                        cmd.Parameters.AddWithValue("@DepositID", selectedDepositID);

                        cmd.ExecuteNonQuery();
                    }
                }

                MessageBox.Show("Deposit updated successfully!");

                LoadDeposits();
                ClearFields();
                selectedDepositID = 0;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to update deposit.\n" + ex.Message);
            }
        }
        //btn update

        //btn delete
        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (selectedDepositID == 0)
            {
                MessageBox.Show("Please select a deposit first.");
                return;
            }

            DialogResult result = MessageBox.Show(
                "Are you sure you want to delete this deposit?",
                "Confirm Delete",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Warning
            );

            if (result != DialogResult.Yes)
                return;

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query =
                        "DELETE FROM Deposits WHERE DepositID = @DepositID";

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@DepositID", selectedDepositID);

                        cmd.ExecuteNonQuery();
                    }
                }

                MessageBox.Show("Deposit deleted successfully!");

                LoadDeposits();
                ClearFields();
                selectedDepositID = 0;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Failed to delete deposit.\n" + ex.Message);
            }
        }
        //btn delete

        //btn clear
        private void btnClear_Click(object sender, EventArgs e)
        {
            ClearFields();
        }
        //btn clear
        
    }
}
