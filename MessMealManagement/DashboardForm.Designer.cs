namespace MessMealManagement
{
    partial class DashboardForm
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
            pnlTotalMembers = new Panel();
            lblTotalMembers = new Label();
            lblMembersTitle = new Label();
            pnlTotalDeposit = new Panel();
            lblTotalDeposit = new Label();
            lblDepositTitle = new Label();
            panel3 = new Panel();
            panel4 = new Panel();
            panel5 = new Panel();
            lblTotalMeals = new Label();
            lblTotalMealsTitle = new Label();
            pnlTotalExpense = new Panel();
            lblTotalExpense = new Label();
            lblTotalExpenseTitle = new Label();
            panel7 = new Panel();
            lblMealRate = new Label();
            lblMealRateTitle = new Label();
            pnlRecentActivities = new Panel();
            dgvRecentActivities = new DataGridView();
            lblRecentActivities = new Label();
            tblKpiGrid = new TableLayoutPanel();
            pnlTotalMembers.SuspendLayout();
            pnlTotalDeposit.SuspendLayout();
            panel5.SuspendLayout();
            pnlTotalExpense.SuspendLayout();
            panel7.SuspendLayout();
            pnlRecentActivities.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dgvRecentActivities).BeginInit();
            tblKpiGrid.SuspendLayout();
            SuspendLayout();
            // 
            // tblKpiGrid
            // 
            tblKpiGrid.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            tblKpiGrid.ColumnCount = 3;
            tblKpiGrid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33333F));
            tblKpiGrid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33333F));
            tblKpiGrid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33334F));
            tblKpiGrid.Controls.Add(pnlTotalMembers, 0, 0);
            tblKpiGrid.Controls.Add(pnlTotalDeposit, 1, 0);
            tblKpiGrid.Controls.Add(pnlTotalExpense, 2, 0);
            tblKpiGrid.Controls.Add(panel5, 0, 1);
            tblKpiGrid.Controls.Add(panel7, 1, 1);
            tblKpiGrid.Location = new Point(25, 20);
            tblKpiGrid.Name = "tblKpiGrid";
            tblKpiGrid.RowCount = 2;
            tblKpiGrid.RowStyles.Add(new RowStyle(SizeType.Percent, 50F));
            tblKpiGrid.RowStyles.Add(new RowStyle(SizeType.Percent, 50F));
            tblKpiGrid.SetColumnSpan(panel7, 2);
            tblKpiGrid.Size = new Size(860, 230);
            tblKpiGrid.TabIndex = 0;
            // 
            // pnlTotalMembers
            // 
            pnlTotalMembers.BackColor = Color.White;
            pnlTotalMembers.BorderStyle = BorderStyle.FixedSingle;
            pnlTotalMembers.Controls.Add(lblTotalMembers);
            pnlTotalMembers.Controls.Add(lblMembersTitle);
            pnlTotalMembers.Dock = DockStyle.Fill;
            pnlTotalMembers.Location = new Point(3, 3);
            pnlTotalMembers.Margin = new Padding(3, 3, 8, 8);
            pnlTotalMembers.Name = "pnlTotalMembers";
            pnlTotalMembers.Size = new Size(275, 104);
            pnlTotalMembers.TabIndex = 0;
            // 
            // lblTotalMembers
            // 
            lblTotalMembers.AutoSize = true;
            lblTotalMembers.Font = new Font("Segoe UI", 20F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMembers.ForeColor = Color.FromArgb(15, 23, 42);
            lblTotalMembers.Location = new Point(16, 45);
            lblTotalMembers.Name = "lblTotalMembers";
            lblTotalMembers.Size = new Size(40, 46);
            lblTotalMembers.TabIndex = 1;
            lblTotalMembers.Text = "0";
            // 
            // lblMembersTitle
            // 
            lblMembersTitle.AutoSize = true;
            lblMembersTitle.Font = new Font("Segoe UI", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblMembersTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblMembersTitle.Location = new Point(16, 15);
            lblMembersTitle.Name = "lblMembersTitle";
            lblMembersTitle.Size = new Size(165, 21);
            lblMembersTitle.TabIndex = 0;
            lblMembersTitle.Text = "👥 TOTAL MEMBERS";
            // 
            // pnlTotalDeposit
            // 
            pnlTotalDeposit.BackColor = Color.White;
            pnlTotalDeposit.BorderStyle = BorderStyle.FixedSingle;
            pnlTotalDeposit.Controls.Add(lblTotalDeposit);
            pnlTotalDeposit.Controls.Add(lblDepositTitle);
            pnlTotalDeposit.Dock = DockStyle.Fill;
            pnlTotalDeposit.Location = new Point(289, 3);
            pnlTotalDeposit.Margin = new Padding(3, 3, 8, 8);
            pnlTotalDeposit.Name = "pnlTotalDeposit";
            pnlTotalDeposit.Size = new Size(275, 104);
            pnlTotalDeposit.TabIndex = 1;
            // 
            // lblTotalDeposit
            // 
            lblTotalDeposit.AutoSize = true;
            lblTotalDeposit.Font = new Font("Segoe UI", 18F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalDeposit.ForeColor = Color.FromArgb(5, 150, 105);
            lblTotalDeposit.Location = new Point(16, 45);
            lblTotalDeposit.Name = "lblTotalDeposit";
            lblTotalDeposit.Size = new Size(35, 41);
            lblTotalDeposit.TabIndex = 2;
            lblTotalDeposit.Text = "0";
            // 
            // lblDepositTitle
            // 
            lblDepositTitle.AutoSize = true;
            lblDepositTitle.Font = new Font("Segoe UI", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblDepositTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblDepositTitle.Location = new Point(16, 15);
            lblDepositTitle.Name = "lblDepositTitle";
            lblDepositTitle.Size = new Size(150, 21);
            lblDepositTitle.TabIndex = 2;
            lblDepositTitle.Text = "💰 TOTAL DEPOSIT";
            // 
            // pnlTotalExpense
            // 
            pnlTotalExpense.BackColor = Color.White;
            pnlTotalExpense.BorderStyle = BorderStyle.FixedSingle;
            pnlTotalExpense.Controls.Add(lblTotalExpense);
            pnlTotalExpense.Controls.Add(lblTotalExpenseTitle);
            pnlTotalExpense.Dock = DockStyle.Fill;
            pnlTotalExpense.Location = new Point(575, 3);
            pnlTotalExpense.Margin = new Padding(3, 3, 3, 8);
            pnlTotalExpense.Name = "pnlTotalExpense";
            pnlTotalExpense.Size = new Size(282, 104);
            pnlTotalExpense.TabIndex = 2;
            // 
            // lblTotalExpense
            // 
            lblTotalExpense.AutoSize = true;
            lblTotalExpense.BackColor = Color.Transparent;
            lblTotalExpense.Font = new Font("Segoe UI", 18F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalExpense.ForeColor = Color.FromArgb(220, 38, 38);
            lblTotalExpense.Location = new Point(16, 45);
            lblTotalExpense.Name = "lblTotalExpense";
            lblTotalExpense.Size = new Size(95, 41);
            lblTotalExpense.TabIndex = 1;
            lblTotalExpense.Text = "৳ 0.00";
            // 
            // lblTotalExpenseTitle
            // 
            lblTotalExpenseTitle.AutoSize = true;
            lblTotalExpenseTitle.Font = new Font("Segoe UI", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalExpenseTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblTotalExpenseTitle.Location = new Point(16, 15);
            lblTotalExpenseTitle.Name = "lblTotalExpenseTitle";
            lblTotalExpenseTitle.Size = new Size(153, 21);
            lblTotalExpenseTitle.TabIndex = 0;
            lblTotalExpenseTitle.Text = "🛒 TOTAL EXPENSE";
            // 
            // panel5
            // 
            panel5.BackColor = Color.White;
            panel5.BorderStyle = BorderStyle.FixedSingle;
            panel5.Controls.Add(lblTotalMeals);
            panel5.Controls.Add(lblTotalMealsTitle);
            panel5.Dock = DockStyle.Fill;
            panel5.Location = new Point(3, 118);
            panel5.Margin = new Padding(3, 3, 8, 3);
            panel5.Name = "panel5";
            panel5.Size = new Size(275, 109);
            panel5.TabIndex = 3;
            // 
            // lblTotalMeals
            // 
            lblTotalMeals.AutoSize = true;
            lblTotalMeals.Font = new Font("Segoe UI", 20F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMeals.ForeColor = Color.FromArgb(217, 119, 6);
            lblTotalMeals.Location = new Point(16, 45);
            lblTotalMeals.Name = "lblTotalMeals";
            lblTotalMeals.Size = new Size(40, 46);
            lblTotalMeals.TabIndex = 1;
            lblTotalMeals.Text = "0";
            // 
            // lblTotalMealsTitle
            // 
            lblTotalMealsTitle.AutoSize = true;
            lblTotalMealsTitle.Font = new Font("Segoe UI", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMealsTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblTotalMealsTitle.Location = new Point(16, 15);
            lblTotalMealsTitle.Name = "lblTotalMealsTitle";
            lblTotalMealsTitle.Size = new Size(137, 21);
            lblTotalMealsTitle.TabIndex = 0;
            lblTotalMealsTitle.Text = "🍲 TOTAL MEALS";
            // 
            // panel7
            // 
            panel7.BackColor = Color.FromArgb(37, 99, 235);
            panel7.BorderStyle = BorderStyle.FixedSingle;
            panel7.Controls.Add(lblMealRate);
            panel7.Controls.Add(lblMealRateTitle);
            panel7.Dock = DockStyle.Fill;
            panel7.Location = new Point(289, 118);
            panel7.Margin = new Padding(3);
            panel7.Name = "panel7";
            panel7.Size = new Size(568, 109);
            panel7.TabIndex = 3;
            // 
            // lblMealRate
            // 
            lblMealRate.AutoSize = true;
            lblMealRate.Font = new Font("Segoe UI", 22F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblMealRate.ForeColor = Color.White;
            lblMealRate.Location = new Point(20, 42);
            lblMealRate.Name = "lblMealRate";
            lblMealRate.Size = new Size(125, 50);
            lblMealRate.TabIndex = 1;
            lblMealRate.Text = "৳ 0.00";
            // 
            // lblMealRateTitle
            // 
            lblMealRateTitle.AutoSize = true;
            lblMealRateTitle.Font = new Font("Segoe UI", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblMealRateTitle.ForeColor = Color.FromArgb(219, 234, 254);
            lblMealRateTitle.Location = new Point(22, 14);
            lblMealRateTitle.Name = "lblMealRateTitle";
            lblMealRateTitle.Size = new Size(357, 23);
            lblMealRateTitle.TabIndex = 0;
            lblMealRateTitle.Text = "⚡ CURRENT MEAL RATE (EXPENSE ÷ MEALS)";
            // 
            // panel3
            // 
            panel3.Location = new Point(0, 0);
            panel3.Name = "panel3";
            panel3.Size = new Size(0, 0);
            panel3.TabIndex = 2;
            // 
            // panel4
            // 
            panel4.Location = new Point(0, 0);
            panel4.Name = "panel4";
            panel4.Size = new Size(0, 0);
            panel4.TabIndex = 2;
            // 
            // pnlRecentActivities
            // 
            pnlRecentActivities.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            pnlRecentActivities.BackColor = Color.White;
            pnlRecentActivities.BorderStyle = BorderStyle.FixedSingle;
            pnlRecentActivities.Controls.Add(dgvRecentActivities);
            pnlRecentActivities.Controls.Add(lblRecentActivities);
            pnlRecentActivities.Location = new Point(25, 260);
            pnlRecentActivities.Name = "pnlRecentActivities";
            pnlRecentActivities.Size = new Size(860, 365);
            pnlRecentActivities.TabIndex = 1;
            // 
            // dgvRecentActivities
            // 
            dgvRecentActivities.AllowUserToAddRows = false;
            dgvRecentActivities.AllowUserToDeleteRows = false;
            dgvRecentActivities.AllowUserToResizeRows = false;
            dgvRecentActivities.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dgvRecentActivities.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dgvRecentActivities.BackgroundColor = Color.White;
            dgvRecentActivities.BorderStyle = BorderStyle.None;
            dgvRecentActivities.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvRecentActivities.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dataGridViewCellStyle1.ForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.SelectionBackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.SelectionForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
            dgvRecentActivities.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            dgvRecentActivities.ColumnHeadersHeight = 36;
            dgvRecentActivities.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = Color.White;
            dataGridViewCellStyle2.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dataGridViewCellStyle2.ForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.SelectionBackColor = Color.FromArgb(239, 246, 255);
            dataGridViewCellStyle2.SelectionForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
            dgvRecentActivities.DefaultCellStyle = dataGridViewCellStyle2;
            dgvRecentActivities.EnableHeadersVisualStyles = false;
            dgvRecentActivities.GridColor = Color.FromArgb(226, 232, 240);
            dgvRecentActivities.Location = new Point(15, 45);
            dgvRecentActivities.MultiSelect = false;
            dgvRecentActivities.Name = "dgvRecentActivities";
            dgvRecentActivities.ReadOnly = true;
            dgvRecentActivities.RowHeadersVisible = false;
            dgvRecentActivities.RowHeadersWidth = 51;
            dgvRecentActivities.RowTemplate.Height = 32;
            dgvRecentActivities.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvRecentActivities.Size = new Size(828, 305);
            dgvRecentActivities.TabIndex = 1;
            // 
            // lblRecentActivities
            // 
            lblRecentActivities.AutoSize = true;
            lblRecentActivities.Font = new Font("Segoe UI", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblRecentActivities.ForeColor = Color.FromArgb(15, 23, 42);
            lblRecentActivities.Location = new Point(15, 12);
            lblRecentActivities.Name = "lblRecentActivities";
            lblRecentActivities.Size = new Size(335, 25);
            lblRecentActivities.TabIndex = 0;
            lblRecentActivities.Text = "📋 RECENT ACTIVITIES (LIVE STREAM)";
            // 
            // DashboardForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoScroll = true;
            BackColor = Color.FromArgb(248, 250, 252);
            ClientSize = new Size(911, 640);
            Controls.Add(pnlRecentActivities);
            Controls.Add(tblKpiGrid);
            Controls.Add(panel4);
            Controls.Add(panel3);
            MinimumSize = new Size(700, 500);
            Name = "DashboardForm";
            Text = "Dashboard";
            pnlTotalMembers.ResumeLayout(false);
            pnlTotalMembers.PerformLayout();
            pnlTotalDeposit.ResumeLayout(false);
            pnlTotalDeposit.PerformLayout();
            panel5.ResumeLayout(false);
            panel5.PerformLayout();
            pnlTotalExpense.ResumeLayout(false);
            pnlTotalExpense.PerformLayout();
            panel7.ResumeLayout(false);
            panel7.PerformLayout();
            pnlRecentActivities.ResumeLayout(false);
            pnlRecentActivities.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)dgvRecentActivities).EndInit();
            tblKpiGrid.ResumeLayout(false);
            ResumeLayout(false);
        }

        #endregion

        private Panel pnlTotalMembers;
        private Panel pnlTotalDeposit;
        private Panel panel3;
        private Panel panel4;
        private Panel panel5;
        private Panel pnlTotalExpense;
        private Panel panel7;
        private Label lblMembersTitle;
        private Label lblTotalMembers;
        private Label lblDepositTitle;
        private Label lblTotalDeposit;
        private Label lblTotalExpenseTitle;
        private Label lblTotalExpense;
        private Label lblTotalMeals;
        private Label lblTotalMealsTitle;
        private Label lblMealRate;
        private Label lblMealRateTitle;
        private Panel pnlRecentActivities;
        private Label lblRecentActivities;
        private DataGridView dgvRecentActivities;
        private TableLayoutPanel tblKpiGrid;
    }
}
