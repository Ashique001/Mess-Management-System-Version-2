namespace MessMealManagement
{
    partial class MonthlyOverviewForm
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
            DataGridViewCellStyle dataGridViewCellStyle3 = new DataGridViewCellStyle();
            DataGridViewCellStyle dataGridViewCellStyle4 = new DataGridViewCellStyle();
            lblPageTitle = new Label();
            lblSubtitle = new Label();
            pnlFilterCard = new Panel();
            lblStatusNote = new Label();
            btnRefresh = new Button();
            btnThisMonth = new Button();
            dtpTo = new DateTimePicker();
            lblTo = new Label();
            dtpFrom = new DateTimePicker();
            lblFrom = new Label();
            tblSummaryDeck = new TableLayoutPanel();
            pnlCardMeals = new Panel();
            lblTotalMeals = new Label();
            lblTotalMealsTitle = new Label();
            pnlCardMarket = new Panel();
            lblTotalMarket = new Label();
            lblTotalMarketTitle = new Label();
            pnlCardRate = new Panel();
            lblMealRate = new Label();
            lblMealRateTitle = new Label();
            pnlCardMembers = new Panel();
            lblActiveMembers = new Label();
            lblActiveMembersTitle = new Label();
            tabViews = new TabControl();
            tabSummary = new TabPage();
            dgvMemberSummary = new DataGridView();
            tabMatrix = new TabPage();
            dgvDailyMatrix = new DataGridView();
            pnlFilterCard.SuspendLayout();
            tblSummaryDeck.SuspendLayout();
            pnlCardMeals.SuspendLayout();
            pnlCardMarket.SuspendLayout();
            pnlCardRate.SuspendLayout();
            pnlCardMembers.SuspendLayout();
            tabViews.SuspendLayout();
            tabSummary.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dgvMemberSummary).BeginInit();
            tabMatrix.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dgvDailyMatrix).BeginInit();
            SuspendLayout();
            // 
            // lblPageTitle
            // 
            lblPageTitle.AutoSize = true;
            lblPageTitle.Font = new Font("Segoe UI", 15F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblPageTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblPageTitle.Location = new Point(25, 14);
            lblPageTitle.Name = "lblPageTitle";
            lblPageTitle.Size = new Size(475, 35);
            lblPageTitle.TabIndex = 0;
            lblPageTitle.Text = "📅 MONTHLY MEAL OVERVIEW & SHEET";
            // 
            // lblSubtitle
            // 
            lblSubtitle.AutoSize = true;
            lblSubtitle.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblSubtitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblSubtitle.Location = new Point(28, 48);
            lblSubtitle.Name = "lblSubtitle";
            lblSubtitle.Size = new Size(504, 20);
            lblSubtitle.TabIndex = 1;
            lblSubtitle.Text = "Comprehensive monthly ledger, individual meal counts, and daily sheet matrix";
            // 
            // pnlFilterCard
            // 
            pnlFilterCard.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            pnlFilterCard.BackColor = Color.White;
            pnlFilterCard.BorderStyle = BorderStyle.FixedSingle;
            pnlFilterCard.Controls.Add(lblStatusNote);
            pnlFilterCard.Controls.Add(btnRefresh);
            pnlFilterCard.Controls.Add(btnThisMonth);
            pnlFilterCard.Controls.Add(dtpTo);
            pnlFilterCard.Controls.Add(lblTo);
            pnlFilterCard.Controls.Add(dtpFrom);
            pnlFilterCard.Controls.Add(lblFrom);
            pnlFilterCard.Location = new Point(25, 75);
            pnlFilterCard.Name = "pnlFilterCard";
            pnlFilterCard.Size = new Size(860, 65);
            pnlFilterCard.TabIndex = 2;
            // 
            // lblStatusNote
            // 
            lblStatusNote.Anchor = AnchorStyles.Top | AnchorStyles.Right;
            lblStatusNote.AutoSize = true;
            lblStatusNote.Font = new Font("Segoe UI", 8.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblStatusNote.ForeColor = Color.FromArgb(5, 150, 105);
            lblStatusNote.Location = new Point(640, 22);
            lblStatusNote.Name = "lblStatusNote";
            lblStatusNote.Size = new Size(205, 20);
            lblStatusNote.TabIndex = 6;
            lblStatusNote.Text = "⚡ Auto-calculates on change";
            // 
            // btnRefresh
            // 
            btnRefresh.BackColor = Color.FromArgb(241, 245, 249);
            btnRefresh.Cursor = Cursors.Hand;
            btnRefresh.FlatAppearance.BorderColor = Color.FromArgb(203, 213, 225);
            btnRefresh.FlatStyle = FlatStyle.Flat;
            btnRefresh.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnRefresh.ForeColor = Color.FromArgb(30, 41, 59);
            btnRefresh.Location = new Point(515, 16);
            btnRefresh.Name = "btnRefresh";
            btnRefresh.Size = new Size(105, 32);
            btnRefresh.TabIndex = 5;
            btnRefresh.Text = "🔄 Refresh";
            btnRefresh.UseVisualStyleBackColor = false;
            btnRefresh.Click += btnRefresh_Click;
            // 
            // btnThisMonth
            // 
            btnThisMonth.BackColor = Color.FromArgb(239, 246, 255);
            btnThisMonth.Cursor = Cursors.Hand;
            btnThisMonth.FlatAppearance.BorderColor = Color.FromArgb(191, 219, 254);
            btnThisMonth.FlatStyle = FlatStyle.Flat;
            btnThisMonth.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnThisMonth.ForeColor = Color.FromArgb(29, 78, 216);
            btnThisMonth.Location = new Point(395, 16);
            btnThisMonth.Name = "btnThisMonth";
            btnThisMonth.Size = new Size(110, 32);
            btnThisMonth.TabIndex = 4;
            btnThisMonth.Text = "📅 This Month";
            btnThisMonth.UseVisualStyleBackColor = false;
            btnThisMonth.Click += btnThisMonth_Click;
            // 
            // dtpTo
            // 
            dtpTo.CustomFormat = "dd-MM-yyyy";
            dtpTo.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dtpTo.Format = DateTimePickerFormat.Custom;
            dtpTo.Location = new Point(245, 18);
            dtpTo.Name = "dtpTo";
            dtpTo.Size = new Size(135, 29);
            dtpTo.TabIndex = 3;
            dtpTo.ValueChanged += DateFilter_ValueChanged;
            // 
            // lblTo
            // 
            lblTo.AutoSize = true;
            lblTo.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTo.ForeColor = Color.FromArgb(71, 85, 105);
            lblTo.Location = new Point(208, 22);
            lblTo.Name = "lblTo";
            lblTo.Size = new Size(31, 21);
            lblTo.TabIndex = 2;
            lblTo.Text = "To:";
            // 
            // dtpFrom
            // 
            dtpFrom.CustomFormat = "dd-MM-yyyy";
            dtpFrom.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dtpFrom.Format = DateTimePickerFormat.Custom;
            dtpFrom.Location = new Point(65, 18);
            dtpFrom.Name = "dtpFrom";
            dtpFrom.Size = new Size(135, 29);
            dtpFrom.TabIndex = 1;
            dtpFrom.ValueChanged += DateFilter_ValueChanged;
            // 
            // lblFrom
            // 
            lblFrom.AutoSize = true;
            lblFrom.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblFrom.ForeColor = Color.FromArgb(71, 85, 105);
            lblFrom.Location = new Point(12, 22);
            lblFrom.Name = "lblFrom";
            lblFrom.Size = new Size(51, 21);
            lblFrom.TabIndex = 0;
            lblFrom.Text = "From:";
            // 
            // tblSummaryDeck
            // 
            tblSummaryDeck.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            tblSummaryDeck.ColumnCount = 4;
            tblSummaryDeck.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 25F));
            tblSummaryDeck.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 25F));
            tblSummaryDeck.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 25F));
            tblSummaryDeck.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 25F));
            tblSummaryDeck.Controls.Add(pnlCardMeals, 0, 0);
            tblSummaryDeck.Controls.Add(pnlCardMarket, 1, 0);
            tblSummaryDeck.Controls.Add(pnlCardRate, 2, 0);
            tblSummaryDeck.Controls.Add(pnlCardMembers, 3, 0);
            tblSummaryDeck.Location = new Point(25, 148);
            tblSummaryDeck.Name = "tblSummaryDeck";
            tblSummaryDeck.RowCount = 1;
            tblSummaryDeck.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
            tblSummaryDeck.Size = new Size(860, 95);
            tblSummaryDeck.TabIndex = 3;
            // 
            // pnlCardMeals
            // 
            pnlCardMeals.BackColor = Color.White;
            pnlCardMeals.BorderStyle = BorderStyle.FixedSingle;
            pnlCardMeals.Controls.Add(lblTotalMeals);
            pnlCardMeals.Controls.Add(lblTotalMealsTitle);
            pnlCardMeals.Dock = DockStyle.Fill;
            pnlCardMeals.Location = new Point(3, 3);
            pnlCardMeals.Margin = new Padding(3, 3, 6, 3);
            pnlCardMeals.Name = "pnlCardMeals";
            pnlCardMeals.Size = new Size(206, 89);
            pnlCardMeals.TabIndex = 0;
            // 
            // lblTotalMeals
            // 
            lblTotalMeals.AutoSize = true;
            lblTotalMeals.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMeals.ForeColor = Color.FromArgb(217, 119, 6);
            lblTotalMeals.Location = new Point(15, 38);
            lblTotalMeals.Name = "lblTotalMeals";
            lblTotalMeals.Size = new Size(32, 37);
            lblTotalMeals.TabIndex = 1;
            lblTotalMeals.Text = "0";
            // 
            // lblTotalMealsTitle
            // 
            lblTotalMealsTitle.AutoSize = true;
            lblTotalMealsTitle.Font = new Font("Segoe UI Semibold", 8.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMealsTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblTotalMealsTitle.Location = new Point(15, 14);
            lblTotalMealsTitle.Name = "lblTotalMealsTitle";
            lblTotalMealsTitle.Size = new Size(160, 20);
            lblTotalMealsTitle.TabIndex = 0;
            lblTotalMealsTitle.Text = "TOTAL MEALS (মোট মিল)";
            // 
            // pnlCardMarket
            // 
            pnlCardMarket.BackColor = Color.White;
            pnlCardMarket.BorderStyle = BorderStyle.FixedSingle;
            pnlCardMarket.Controls.Add(lblTotalMarket);
            pnlCardMarket.Controls.Add(lblTotalMarketTitle);
            pnlCardMarket.Dock = DockStyle.Fill;
            pnlCardMarket.Location = new Point(218, 3);
            pnlCardMarket.Margin = new Padding(3, 3, 6, 3);
            pnlCardMarket.Name = "pnlCardMarket";
            pnlCardMarket.Size = new Size(206, 89);
            pnlCardMarket.TabIndex = 1;
            // 
            // lblTotalMarket
            // 
            lblTotalMarket.AutoSize = true;
            lblTotalMarket.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMarket.ForeColor = Color.FromArgb(220, 38, 38);
            lblTotalMarket.Location = new Point(15, 38);
            lblTotalMarket.Name = "lblTotalMarket";
            lblTotalMarket.Size = new Size(88, 37);
            lblTotalMarket.TabIndex = 1;
            lblTotalMarket.Text = "৳0.00";
            // 
            // lblTotalMarketTitle
            // 
            lblTotalMarketTitle.AutoSize = true;
            lblTotalMarketTitle.Font = new Font("Segoe UI Semibold", 8.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMarketTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblTotalMarketTitle.Location = new Point(15, 14);
            lblTotalMarketTitle.Name = "lblTotalMarketTitle";
            lblTotalMarketTitle.Size = new Size(181, 20);
            lblTotalMarketTitle.TabIndex = 0;
            lblTotalMarketTitle.Text = "TOTAL MARKET (মোট বাজার)";
            // 
            // pnlCardRate
            // 
            pnlCardRate.BackColor = Color.FromArgb(37, 99, 235);
            pnlCardRate.BorderStyle = BorderStyle.FixedSingle;
            pnlCardRate.Controls.Add(lblMealRate);
            pnlCardRate.Controls.Add(lblMealRateTitle);
            pnlCardRate.Dock = DockStyle.Fill;
            pnlCardRate.Location = new Point(433, 3);
            pnlCardRate.Margin = new Padding(3, 3, 6, 3);
            pnlCardRate.Name = "pnlCardRate";
            pnlCardRate.Size = new Size(206, 89);
            pnlCardRate.TabIndex = 2;
            // 
            // lblMealRate
            // 
            lblMealRate.AutoSize = true;
            lblMealRate.Font = new Font("Segoe UI", 17F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblMealRate.ForeColor = Color.White;
            lblMealRate.Location = new Point(14, 38);
            lblMealRate.Name = "lblMealRate";
            lblMealRate.Size = new Size(95, 40);
            lblMealRate.TabIndex = 1;
            lblMealRate.Text = "৳0.00";
            // 
            // lblMealRateTitle
            // 
            lblMealRateTitle.AutoSize = true;
            lblMealRateTitle.Font = new Font("Segoe UI Semibold", 8.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblMealRateTitle.ForeColor = Color.FromArgb(219, 234, 254);
            lblMealRateTitle.Location = new Point(14, 14);
            lblMealRateTitle.Name = "lblMealRateTitle";
            lblMealRateTitle.Size = new Size(157, 20);
            lblMealRateTitle.TabIndex = 0;
            lblMealRateTitle.Text = "MEAL RATE (মিল রেট)";
            // 
            // pnlCardMembers
            // 
            pnlCardMembers.BackColor = Color.White;
            pnlCardMembers.BorderStyle = BorderStyle.FixedSingle;
            pnlCardMembers.Controls.Add(lblActiveMembers);
            pnlCardMembers.Controls.Add(lblActiveMembersTitle);
            pnlCardMembers.Dock = DockStyle.Fill;
            pnlCardMembers.Location = new Point(648, 3);
            pnlCardMembers.Name = "pnlCardMembers";
            pnlCardMembers.Size = new Size(209, 89);
            pnlCardMembers.TabIndex = 3;
            // 
            // lblActiveMembers
            // 
            lblActiveMembers.AutoSize = true;
            lblActiveMembers.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblActiveMembers.ForeColor = Color.FromArgb(15, 23, 42);
            lblActiveMembers.Location = new Point(15, 38);
            lblActiveMembers.Name = "lblActiveMembers";
            lblActiveMembers.Size = new Size(32, 37);
            lblActiveMembers.TabIndex = 1;
            lblActiveMembers.Text = "0";
            // 
            // lblActiveMembersTitle
            // 
            lblActiveMembersTitle.AutoSize = true;
            lblActiveMembersTitle.Font = new Font("Segoe UI Semibold", 8.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblActiveMembersTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblActiveMembersTitle.Location = new Point(15, 14);
            lblActiveMembersTitle.Name = "lblActiveMembersTitle";
            lblActiveMembersTitle.Size = new Size(183, 20);
            lblActiveMembersTitle.TabIndex = 0;
            lblActiveMembersTitle.Text = "ACTIVE BORDERS (সদস্য)";
            // 
            // tabViews
            // 
            tabViews.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            tabViews.Controls.Add(tabSummary);
            tabViews.Controls.Add(tabMatrix);
            tabViews.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            tabViews.Location = new Point(25, 252);
            tabViews.Name = "tabViews";
            tabViews.Padding = new Point(18, 8);
            tabViews.SelectedIndex = 0;
            tabViews.Size = new Size(860, 365);
            tabViews.TabIndex = 4;
            // 
            // tabSummary
            // 
            tabSummary.BackColor = Color.FromArgb(248, 250, 252);
            tabSummary.Controls.Add(dgvMemberSummary);
            tabSummary.Location = new Point(4, 42);
            tabSummary.Name = "tabSummary";
            tabSummary.Padding = new Padding(10);
            tabSummary.Size = new Size(852, 319);
            tabSummary.TabIndex = 0;
            tabSummary.Text = "  📋 Member Meal Totals  ";
            // 
            // dgvMemberSummary
            // 
            dgvMemberSummary.AllowUserToAddRows = false;
            dgvMemberSummary.AllowUserToDeleteRows = false;
            dgvMemberSummary.AllowUserToResizeRows = false;
            dgvMemberSummary.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dgvMemberSummary.BackgroundColor = Color.White;
            dgvMemberSummary.BorderStyle = BorderStyle.FixedSingle;
            dgvMemberSummary.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvMemberSummary.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dataGridViewCellStyle1.ForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.SelectionBackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.SelectionForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
            dgvMemberSummary.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            dgvMemberSummary.ColumnHeadersHeight = 38;
            dgvMemberSummary.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = Color.White;
            dataGridViewCellStyle2.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dataGridViewCellStyle2.ForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.SelectionBackColor = Color.FromArgb(239, 246, 255);
            dataGridViewCellStyle2.SelectionForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
            dgvMemberSummary.DefaultCellStyle = dataGridViewCellStyle2;
            dgvMemberSummary.Dock = DockStyle.Fill;
            dgvMemberSummary.EnableHeadersVisualStyles = false;
            dgvMemberSummary.GridColor = Color.FromArgb(226, 232, 240);
            dgvMemberSummary.Location = new Point(10, 10);
            dgvMemberSummary.MultiSelect = false;
            dgvMemberSummary.Name = "dgvMemberSummary";
            dgvMemberSummary.ReadOnly = true;
            dgvMemberSummary.RowHeadersVisible = false;
            dgvMemberSummary.RowHeadersWidth = 51;
            dgvMemberSummary.RowTemplate.Height = 36;
            dgvMemberSummary.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvMemberSummary.Size = new Size(832, 299);
            dgvMemberSummary.TabIndex = 0;
            // 
            // tabMatrix
            // 
            tabMatrix.BackColor = Color.FromArgb(248, 250, 252);
            tabMatrix.Controls.Add(dgvDailyMatrix);
            tabMatrix.Location = new Point(4, 42);
            tabMatrix.Name = "tabMatrix";
            tabMatrix.Padding = new Padding(10);
            tabMatrix.Size = new Size(852, 319);
            tabMatrix.TabIndex = 1;
            tabMatrix.Text = "  🗓️ Daily Sheet (Member D & N Matrix)  ";
            // 
            // dgvDailyMatrix
            // 
            dgvDailyMatrix.AllowUserToAddRows = false;
            dgvDailyMatrix.AllowUserToDeleteRows = false;
            dgvDailyMatrix.AllowUserToResizeRows = false;
            dgvDailyMatrix.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.DisplayedCells;
            dgvDailyMatrix.BackgroundColor = Color.White;
            dgvDailyMatrix.BorderStyle = BorderStyle.FixedSingle;
            dgvDailyMatrix.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvDailyMatrix.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleCenter;
            dataGridViewCellStyle3.BackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle3.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dataGridViewCellStyle3.ForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle3.SelectionBackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle3.SelectionForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle3.WrapMode = DataGridViewTriState.True;
            dgvDailyMatrix.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle3;
            dgvDailyMatrix.ColumnHeadersHeight = 38;
            dgvDailyMatrix.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            dataGridViewCellStyle4.Alignment = DataGridViewContentAlignment.MiddleCenter;
            dataGridViewCellStyle4.BackColor = Color.White;
            dataGridViewCellStyle4.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dataGridViewCellStyle4.ForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle4.SelectionBackColor = Color.FromArgb(59, 130, 246);
            dataGridViewCellStyle4.SelectionForeColor = Color.White;
            dataGridViewCellStyle4.WrapMode = DataGridViewTriState.False;
            dgvDailyMatrix.DefaultCellStyle = dataGridViewCellStyle4;
            dgvDailyMatrix.Dock = DockStyle.Fill;
            dgvDailyMatrix.EnableHeadersVisualStyles = false;
            dgvDailyMatrix.GridColor = Color.FromArgb(226, 232, 240);
            dgvDailyMatrix.Location = new Point(10, 10);
            dgvDailyMatrix.MultiSelect = false;
            dgvDailyMatrix.Name = "dgvDailyMatrix";
            dgvDailyMatrix.ReadOnly = true;
            dgvDailyMatrix.RowHeadersVisible = false;
            dgvDailyMatrix.RowHeadersWidth = 51;
            dgvDailyMatrix.RowTemplate.Height = 32;
            dgvDailyMatrix.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvDailyMatrix.CellClick += dgvDailyMatrix_CellClick;
            dgvDailyMatrix.Size = new Size(832, 299);
            dgvDailyMatrix.TabIndex = 0;
            // 
            // MonthlyOverviewForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoScroll = true;
            BackColor = Color.FromArgb(248, 250, 252);
            ClientSize = new Size(911, 640);
            Controls.Add(tabViews);
            Controls.Add(tblSummaryDeck);
            Controls.Add(pnlFilterCard);
            Controls.Add(lblSubtitle);
            Controls.Add(lblPageTitle);
            MinimumSize = new Size(750, 550);
            Name = "MonthlyOverviewForm";
            Text = "Monthly Overview";
            pnlFilterCard.ResumeLayout(false);
            pnlFilterCard.PerformLayout();
            tblSummaryDeck.ResumeLayout(false);
            pnlCardMeals.ResumeLayout(false);
            pnlCardMeals.PerformLayout();
            pnlCardMarket.ResumeLayout(false);
            pnlCardMarket.PerformLayout();
            pnlCardRate.ResumeLayout(false);
            pnlCardRate.PerformLayout();
            pnlCardMembers.ResumeLayout(false);
            pnlCardMembers.PerformLayout();
            tabViews.ResumeLayout(false);
            tabSummary.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)dgvMemberSummary).EndInit();
            tabMatrix.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)dgvDailyMatrix).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblPageTitle;
        private Label lblSubtitle;
        private Panel pnlFilterCard;
        private Label lblFrom;
        private DateTimePicker dtpFrom;
        private Label lblTo;
        private DateTimePicker dtpTo;
        private Button btnThisMonth;
        private Button btnRefresh;
        private Label lblStatusNote;
        private TableLayoutPanel tblSummaryDeck;
        private Panel pnlCardMeals;
        private Label lblTotalMealsTitle;
        private Label lblTotalMeals;
        private Panel pnlCardMarket;
        private Label lblTotalMarketTitle;
        private Label lblTotalMarket;
        private Panel pnlCardRate;
        private Label lblMealRateTitle;
        private Label lblMealRate;
        private Panel pnlCardMembers;
        private Label lblActiveMembersTitle;
        private Label lblActiveMembers;
        private TabControl tabViews;
        private TabPage tabSummary;
        private DataGridView dgvMemberSummary;
        private TabPage tabMatrix;
        private DataGridView dgvDailyMatrix;
    }
}
