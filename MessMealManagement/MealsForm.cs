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
    public partial class MealsForm : Form
    {
        public MealsForm()
        {
            InitializeComponent();
            //dgvMeals.CellValueChanged += dgvMeals_CellValueChanged_1;
            dgvMeals.CurrentCellDirtyStateChanged += dgvMeals_CurrentCellDirtyStateChanged;
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
        private void LoadMealsByDate()
        {
            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    string query = @"
                SELECT
                    m.MemberID,
                    m.Name,
                    CASE
                        WHEN EXISTS
                        (
                            SELECT 1
                            FROM Meals ml
                            WHERE ml.MemberID = m.MemberID
                            AND ml.MealDate = @MealDate
                            AND ml.MealType = 'Lunch'
                        )
                        THEN CAST(1 AS BIT)
                        ELSE CAST(0 AS BIT)
                    END AS Lunch,

                    CASE
                        WHEN EXISTS
                        (
                            SELECT 1
                            FROM Meals md
                            WHERE md.MemberID = m.MemberID
                            AND md.MealDate = @MealDate
                            AND md.MealType = 'Dinner'
                        )
                        THEN CAST(1 AS BIT)
                        ELSE CAST(0 AS BIT)
                    END AS Dinner

                FROM Members m
                WHERE m.Status = 1
                ORDER BY m.Name";

                    SqlDataAdapter da = new SqlDataAdapter(query, con);

                    da.SelectCommand.Parameters.AddWithValue(
                        "@MealDate",
                        dtpMealDate.Value.Date
                    );

                    DataTable dt = new DataTable();
                    da.Fill(dt);

                    dgvMeals.DataSource = dt;
                    //new part
                    dgvMeals.Columns["MemberID"].Visible = false;

                    if (!dgvMeals.Columns.Contains("Total"))
                    {
                        DataGridViewTextBoxColumn totalColumn =
                            new DataGridViewTextBoxColumn();

                        totalColumn.Name = "Total";
                        totalColumn.HeaderText = "Total";
                        totalColumn.ReadOnly = true;

                        dgvMeals.Columns.Add(totalColumn);
                    }
                    //new part 
                    foreach (DataGridViewRow row in dgvMeals.Rows)
                    {
                        if (row.IsNewRow)
                            continue;

                        bool lunch = Convert.ToBoolean(
                            row.Cells["Lunch"].Value ?? false
                        );

                        bool dinner = Convert.ToBoolean(
                            row.Cells["Dinner"].Value ?? false
                        );

                        row.Cells["Total"].Value =
                            (lunch ? 1 : 0) + (dinner ? 1 : 0);
                    }

                    CalculateTotalMeals();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //total meals lebel er hisab
        private void CalculateTotalMeals()
        {
            int totalMeals = 0;

            foreach (DataGridViewRow row in dgvMeals.Rows)
            {
                if (row.IsNewRow)
                    continue;

                bool lunch = Convert.ToBoolean(
                    row.Cells["Lunch"].Value ?? false
                );

                bool dinner = Convert.ToBoolean(
                    row.Cells["Dinner"].Value ?? false
                );

                if (lunch)
                    totalMeals++;

                if (dinner)
                    totalMeals++;
            }

            lblTotalMeals.Text = "Total Meals: " + totalMeals;
        }
        // checkbox immediate kaj er jnno

        private void dgvMeals_CurrentCellDirtyStateChanged(object sender, EventArgs e)
        {
            if (dgvMeals.IsCurrentCellDirty)
            {
                dgvMeals.CommitEdit(
                    DataGridViewDataErrorContexts.Commit
                );
            }
        }

        private void dgvMeals_CellValueChanged_1(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0)
                return;

            if (dgvMeals.Columns[e.ColumnIndex].Name == "Lunch" ||
                dgvMeals.Columns[e.ColumnIndex].Name == "Dinner")
            {
                bool lunch = Convert.ToBoolean(
                    dgvMeals.Rows[e.RowIndex].Cells["Lunch"].Value ?? false
                );

                bool dinner = Convert.ToBoolean(
                    dgvMeals.Rows[e.RowIndex].Cells["Dinner"].Value ?? false
                );

                int total = 0;

                if (lunch)
                    total++;

                if (dinner)
                    total++;

                dgvMeals.Rows[e.RowIndex].Cells["Total"].Value = total;

                CalculateTotalMeals();
            }
        }

        private void MealsForm_Load(object sender, EventArgs e)
        {
            dtpMealDate.Value = DateTime.Today;

            LoadMealsByDate();
        }

        //btn save meals

        private void btnSaveMeals_Click(object sender, EventArgs e)
        {
            DateTime mealDate = dtpMealDate.Value.Date;

            DatabaseConnection db = new DatabaseConnection();

            try
            {
                using (SqlConnection con = db.GetConnection())
                {
                    con.Open();

                    using (SqlTransaction transaction = con.BeginTransaction())
                    {
                        try
                        {
                            foreach (DataGridViewRow row in dgvMeals.Rows)
                            {
                                if (row.IsNewRow)
                                    continue;

                                int memberID = Convert.ToInt32(
                                    row.Cells["MemberID"].Value
                                );

                                bool lunch = Convert.ToBoolean(
                                    row.Cells["Lunch"].Value ?? false
                                );

                                bool dinner = Convert.ToBoolean(
                                    row.Cells["Dinner"].Value ?? false
                                );

                                // Save Lunch
                                //if (lunch)
                                //{
                                //    SaveMeal(
                                //        con,
                                //        transaction,
                                //        memberID,
                                //        mealDate,
                                //        "Lunch"
                                //    );
                                //}

                                //// Save Dinner
                                //if (dinner)
                                //{
                                //    SaveMeal(
                                //        con,
                                //        transaction,
                                //        memberID,
                                //        mealDate,
                                //        "Dinner"
                                //    );
                                //}
                                //update
                                SaveMeal(con, transaction, memberID, mealDate, "Lunch", lunch);

                                SaveMeal(con, transaction, memberID, mealDate, "Dinner", dinner);

                                //update
                            }

                            transaction.Commit();

                            MessageBox.Show(
                                "Meals saved successfully!",
                                "Success",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Information
                            );
                        }
                        catch
                        {
                            transaction.Rollback();
                            throw;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        //save meal start
        //private void SaveMeal(SqlConnection con, SqlTransaction transaction, int memberID, DateTime mealDate, string mealType)
        //{
        //    string query = @"
        //IF NOT EXISTS
        //(
        //    SELECT 1
        //    FROM Meals
        //    WHERE MemberID = @MemberID
        //    AND MealDate = @MealDate
        //    AND MealType = @MealType
        //)
        //BEGIN
        //    INSERT INTO Meals
        //    (
        //        MemberID,
        //        MealDate,
        //        MealType
        //    )
        //    VALUES
        //    (
        //        @MemberID,
        //        @MealDate,
        //        @MealType
        //    )
        //END";

        //    using (SqlCommand cmd = new SqlCommand(
        //        query,
        //        con,
        //        transaction))
        //    {
        //        cmd.Parameters.AddWithValue("@MemberID", memberID);
        //        cmd.Parameters.AddWithValue("@MealDate", mealDate);
        //        cmd.Parameters.AddWithValue("@MealType", mealType);

        //        cmd.ExecuteNonQuery();
        //    }
        //}


        //update 

        private void SaveMeal(
    SqlConnection con,
    SqlTransaction transaction,
    int memberID,
    DateTime mealDate,
    string mealType,
    bool isChecked)
        {
            string query = "";

            if (isChecked)
            {
                query = @"
        IF NOT EXISTS
        (
            SELECT 1
            FROM Meals
            WHERE MemberID = @MemberID
            AND MealDate = @MealDate
            AND MealType = @MealType
        )
        BEGIN
            INSERT INTO Meals
            (
                MemberID,
                MealDate,
                MealType
            )
            VALUES
            (
                @MemberID,
                @MealDate,
                @MealType
            )
        END";
            }
            else
            {
                query = @"
        DELETE FROM Meals
        WHERE MemberID = @MemberID
        AND MealDate = @MealDate
        AND MealType = @MealType";
            }

            using (SqlCommand cmd = new SqlCommand(
                query,
                con,
                transaction))
            {
                cmd.Parameters.AddWithValue("@MemberID", memberID);
                cmd.Parameters.AddWithValue("@MealDate", mealDate);
                cmd.Parameters.AddWithValue("@MealType", mealType);

                cmd.ExecuteNonQuery();
            }
        }

        //update 

        //load by date
        private void dtpMealDate_ValueChanged(object sender, EventArgs e)
        {
            LoadMealsByDate();
        }
    }
}
