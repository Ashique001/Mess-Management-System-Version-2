namespace MessMealManagement
{
    partial class MealsForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
            DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
            lblTitle = new Label();
            lblDate = new Label();
            dtpMealDate = new DateTimePicker();
            dgvMeals = new DataGridView();
            lblTotalMeals = new Label();
            btnSaveMeals = new Button();
            pnlMealsCard = new Panel();
            lblSubtitle = new Label();
            ((System.ComponentModel.ISupportInitialize)dgvMeals).BeginInit();
            pnlMealsCard.SuspendLayout();
            SuspendLayout();
            // 
            // lblTitle
            // 
            lblTitle.AutoSize = true;
            lblTitle.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblTitle.Location = new Point(30, 20);
            lblTitle.Name = "lblTitle";
            lblTitle.Size = new Size(357, 37);
            lblTitle.TabIndex = 0;
            lblTitle.Text = "🍲 DAILY MEAL REGISTER";
            // 
            // pnlMealsCard
            // 
            pnlMealsCard.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            pnlMealsCard.BackColor = Color.White;
            pnlMealsCard.BorderStyle = BorderStyle.FixedSingle;
            pnlMealsCard.Controls.Add(lblSubtitle);
            pnlMealsCard.Controls.Add(lblDate);
            pnlMealsCard.Controls.Add(dtpMealDate);
            pnlMealsCard.Controls.Add(dgvMeals);
            pnlMealsCard.Controls.Add(lblTotalMeals);
            pnlMealsCard.Controls.Add(btnSaveMeals);
            pnlMealsCard.Location = new Point(30, 68);
            pnlMealsCard.Name = "pnlMealsCard";
            pnlMealsCard.Size = new Size(850, 550);
            pnlMealsCard.TabIndex = 1;
            // 
            // lblDate
            // 
            lblDate.AutoSize = true;
            lblDate.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblDate.ForeColor = Color.FromArgb(71, 85, 105);
            lblDate.Location = new Point(20, 18);
            lblDate.Name = "lblDate";
            lblDate.Size = new Size(100, 23);
            lblDate.TabIndex = 1;
            lblDate.Text = "Select Date:";
            // 
            // dtpMealDate
            // 
            dtpMealDate.Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dtpMealDate.Format = DateTimePickerFormat.Short;
            dtpMealDate.Location = new Point(125, 15);
            dtpMealDate.Name = "dtpMealDate";
            dtpMealDate.Size = new Size(220, 30);
            dtpMealDate.TabIndex = 2;
            dtpMealDate.ValueChanged += dtpMealDate_ValueChanged;
            // 
            // lblSubtitle
            // 
            lblSubtitle.AutoSize = true;
            lblSubtitle.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblSubtitle.ForeColor = Color.FromArgb(148, 163, 184);
            lblSubtitle.Location = new Point(365, 20);
            lblSubtitle.Name = "lblSubtitle";
            lblSubtitle.Size = new Size(393, 20);
            lblSubtitle.TabIndex = 6;
            lblSubtitle.Text = "Check Lunch & Dinner. Daily counts are tallied automatically.";
            // 
            // dgvMeals
            // 
            dgvMeals.AllowUserToAddRows = false;
            dgvMeals.AllowUserToDeleteRows = false;
            dgvMeals.AllowUserToResizeColumns = false;
            dgvMeals.AllowUserToResizeRows = false;
            dgvMeals.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dgvMeals.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dgvMeals.BackgroundColor = Color.White;
            dgvMeals.BorderStyle = BorderStyle.None;
            dgvMeals.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvMeals.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dataGridViewCellStyle1.ForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.SelectionBackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.SelectionForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
            dgvMeals.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            dgvMeals.ColumnHeadersHeight = 38;
            dgvMeals.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = Color.White;
            dataGridViewCellStyle2.Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dataGridViewCellStyle2.ForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.SelectionBackColor = Color.FromArgb(239, 246, 255);
            dataGridViewCellStyle2.SelectionForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
            dgvMeals.DefaultCellStyle = dataGridViewCellStyle2;
            dgvMeals.EnableHeadersVisualStyles = false;
            dgvMeals.GridColor = Color.FromArgb(226, 232, 240);
            dgvMeals.Location = new Point(20, 60);
            dgvMeals.Name = "dgvMeals";
            dgvMeals.RowHeadersVisible = false;
            dgvMeals.RowHeadersWidth = 51;
            dgvMeals.RowTemplate.Height = 36;
            dgvMeals.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvMeals.Size = new Size(808, 410);
            dgvMeals.TabIndex = 3;
            dgvMeals.CellValueChanged += dgvMeals_CellValueChanged_1;
            // 
            // lblTotalMeals
            // 
            lblTotalMeals.Anchor = AnchorStyles.Bottom | AnchorStyles.Left;
            lblTotalMeals.AutoSize = true;
            lblTotalMeals.Font = new Font("Segoe UI", 13F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMeals.ForeColor = Color.FromArgb(37, 99, 235);
            lblTotalMeals.Location = new Point(20, 490);
            lblTotalMeals.Name = "lblTotalMeals";
            lblTotalMeals.Size = new Size(155, 30);
            lblTotalMeals.TabIndex = 4;
            lblTotalMeals.Text = "Total Meals: 0";
            // 
            // btnSaveMeals
            // 
            btnSaveMeals.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnSaveMeals.BackColor = Color.FromArgb(5, 150, 105);
            btnSaveMeals.Cursor = Cursors.Hand;
            btnSaveMeals.FlatAppearance.BorderSize = 0;
            btnSaveMeals.FlatStyle = FlatStyle.Flat;
            btnSaveMeals.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnSaveMeals.ForeColor = Color.White;
            btnSaveMeals.Location = new Point(660, 484);
            btnSaveMeals.Name = "btnSaveMeals";
            btnSaveMeals.Size = new Size(168, 44);
            btnSaveMeals.TabIndex = 5;
            btnSaveMeals.Text = "💾 Save Daily Entry";
            btnSaveMeals.UseVisualStyleBackColor = false;
            btnSaveMeals.Click += btnSaveMeals_Click;
            // 
            // MealsForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoScroll = true;
            BackColor = Color.FromArgb(248, 250, 252);
            ClientSize = new Size(911, 640);
            Controls.Add(pnlMealsCard);
            Controls.Add(lblTitle);
            MinimumSize = new Size(700, 500);
            Name = "MealsForm";
            Text = "Daily Meal Entry";
            Load += MealsForm_Load;
            ((System.ComponentModel.ISupportInitialize)dgvMeals).EndInit();
            pnlMealsCard.ResumeLayout(false);
            pnlMealsCard.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblTitle;
        private Label lblDate;
        private DateTimePicker dtpMealDate;
        private DataGridView dgvMeals;
        private Label lblTotalMeals;
        private Button btnSaveMeals;
        private Panel pnlMealsCard;
        private Label lblSubtitle;
    }
}
