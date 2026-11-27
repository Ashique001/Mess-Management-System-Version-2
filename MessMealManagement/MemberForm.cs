using Microsoft.Data.SqlClient;
using System;
using System.Data;
using System.Windows.Forms;

namespace MessMealManagement
{
    public partial class MemberForm : Form
    {
        private int selectedMemberID = 0;

        public MemberForm()
        {
            InitializeComponent();

            //TestConnection();

            dgvMembers.AutoGenerateColumns = true;
            dgvMembers.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvMembers.MultiSelect = false;

            LoadMembers();
        }

        private void label1_Click(object sender, EventArgs e)
        {
        }

        // Test Database Connection
        //private void TestConnection()
        //{
        //    DatabaseConnection db = new DatabaseConnection();

        //    try
        //    {
        //        using (SqlConnection con = db.GetConnection())
        //        {
        //            con.Open();

        //            MessageBox.Show("Database Connected Successfully!");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        MessageBox.Show(
        //            "Connection Failed!\n" + ex.Message,
        //            "Database Error",
        //            MessageBoxButtons.OK,
        //            MessageBoxIcon.Error);
        //    }
        //}

        // ADD MEMBER
        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text))
            {
                MessageBox.Show("Please enter member name.");
                txtName.Focus();
                return;
            }

            string query = @"INSERT INTO Members (Name, Phone, Status)
                             VALUES (@Name, @Phone, @Status)";

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue(
                            "@Name",
                            txtName.Text.Trim());

                        cmd.Parameters.AddWithValue(
                            "@Phone",
                            txtPhone.Text.Trim());

                        cmd.Parameters.AddWithValue(
                            "@Status",
                            true);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            MessageBox.Show(
                                "Member added successfully!",
                                "Success",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Information);

                            LoadMembers();

                            txtName.Clear();
                            txtPhone.Clear();

                            selectedMemberID = 0;

                            txtName.Focus();
                        }
                        else
                        {
                            MessageBox.Show(
                                "Member was not added.",
                                "Warning",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Warning);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error while adding member:\n" + ex.Message,
                    "Database Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
            }
        }

        // LOAD MEMBERS
        private void LoadMembers()
        {
            string query =
                "SELECT MemberID, Name, Phone, Status FROM Members";

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    using (SqlDataAdapter adapter =
                           new SqlDataAdapter(query, con))
                    {
                        DataTable table = new DataTable();

                        adapter.Fill(table);

                        dgvMembers.DataSource = table;

                        foreach (DataGridViewColumn column in dgvMembers.Columns)
                        {
                            column.SortMode =
                                DataGridViewColumnSortMode.NotSortable;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error loading members:\n" + ex.Message,
                    "Database Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
            }
        }

        // SELECT MEMBER FROM GRID
        private void dgvMembers_CellClick(
    object sender,
    DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0)
            {
                DataGridViewRow row = dgvMembers.Rows[e.RowIndex];

                selectedMemberID =
                    Convert.ToInt32(row.Cells["MemberID"].Value);

                txtName.Text =
                    row.Cells["Name"].Value?.ToString();

                txtPhone.Text =
                    row.Cells["Phone"].Value?.ToString();

                bool status =
                    Convert.ToBoolean(row.Cells["Status"].Value);

                cmbStatus.Text = status ? "Active" : "Inactive";
            }
        }

        // UPDATE MEMBER


        private void btnUpdate_Click_1(object sender, EventArgs e)
        {
            if (selectedMemberID == 0)
            {
                MessageBox.Show("Please select a member first.");
                return;
            }

            if (string.IsNullOrWhiteSpace(txtName.Text))
            {
                MessageBox.Show("Please enter member name.");
                txtName.Focus();
                return;
            }

            string query = @"UPDATE Members
                     SET Name = @Name,
                         Phone = @Phone,
                         Status = @Status
                     WHERE MemberID = @MemberID";

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Name", txtName.Text.Trim());
                        cmd.Parameters.AddWithValue("@Phone", txtPhone.Text.Trim());

                        // Active = true, Inactive = false
                        bool status = cmbStatus.Text == "Active";

                        cmd.Parameters.AddWithValue("@Status", status);
                        cmd.Parameters.AddWithValue("@MemberID", selectedMemberID);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            MessageBox.Show("Member updated successfully!");

                            LoadMembers();

                            txtName.Clear();
                            txtPhone.Clear();
                            cmbStatus.SelectedIndex = -1;

                            selectedMemberID = 0;

                            txtName.Focus();
                        }
                        else
                        {
                            MessageBox.Show("Member not found.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error while updating member:\n" + ex.Message);
            }
        }
        private void btnUpdate_Click(object sender, EventArgs e)
        {

        }

        //CLear button

        private void btnClear_Click(object sender, EventArgs e)
        {
            txtName.Clear();
            txtPhone.Clear();

            cmbStatus.SelectedIndex = -1;

            selectedMemberID = 0;

            dgvMembers.ClearSelection();

            txtName.Focus();
        }

        //clearbutton end

        //delete button start 
        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (selectedMemberID == 0)
            {
                MessageBox.Show(
                    "Please select a member first.",
                    "Warning",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Warning);

                return;
            }

            DialogResult result = MessageBox.Show(
                "Are you sure you want to delete this member?",
                "Confirm Delete",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Question);

            if (result != DialogResult.Yes)
            {
                return;
            }

            string query = @"DELETE FROM Members
                     WHERE MemberID = @MemberID";

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue(
                            "@MemberID",
                            selectedMemberID);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            MessageBox.Show(
                                "Member deleted successfully!",
                                "Success",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Information);

                            // Refresh Grid
                            LoadMembers();

                            // Clear fields
                            txtName.Clear();
                            txtPhone.Clear();
                            cmbStatus.SelectedIndex = -1;

                            // Reset selected member
                            selectedMemberID = 0;

                            // Remove Grid selection
                            dgvMembers.ClearSelection();

                            txtName.Focus();
                        }
                        else
                        {
                            MessageBox.Show(
                                "Member was not found.",
                                "Warning",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Warning);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error while deleting member:\n" + ex.Message,
                    "Database Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
            }
        }

        //delete button end
        
    }
}