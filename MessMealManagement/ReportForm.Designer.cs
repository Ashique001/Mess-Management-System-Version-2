namespace MessMealManagement
{
    partial class ReportForm
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
            lblPageTitle = new Label();
            pnlMealCalculation = new Panel();
            btnCalculate = new Button();
            dtpTo = new DateTimePicker();
            lblTo = new Label();
            dtpFrom = new DateTimePicker();
            lblFrom = new Label();
            lblTitle = new Label();
            tblSummaryDeck = new TableLayoutPanel();
            pnlSummaryCost = new Panel();
            lblTotalMarketCost = new Label();
            lblTotalMarketCostTitle = new Label();
            pnlSummaryMeals = new Panel();
            lblTotalMeals = new Label();
            lblTotalMealsTitle = new Label();
            pnlSummaryRate = new Panel();
            lblMealRate = new Label();
            lblMealRateTitle = new Label();
            dgvReport = new DataGridView();
            pnlMealCalculation.SuspendLayout();
            tblSummaryDeck.SuspendLayout();
            pnlSummaryCost.SuspendLayout();
            pnlSummaryMeals.SuspendLayout();
            pnlSummaryRate.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dgvReport).BeginInit();
            SuspendLayout();
            // 
            // lblPageTitle
            // 
            lblPageTitle.AutoSize = true;
            lblPageTitle.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblPageTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblPageTitle.Location = new Point(30, 16);
            lblPageTitle.Name = "lblPageTitle";
            lblPageTitle.Size = new Size(540, 37);
            lblPageTitle.TabIndex = 3;
            lblPageTitle.Text = "📈 MEAL SETTLEMENT & AUDIT REPORT";
            // 
            // pnlMealCalculation
            // 
            pnlMealCalculation.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            pnlMealCalculation.BackColor = Color.White;
            pnlMealCalculation.BorderStyle = BorderStyle.FixedSingle;
            pnlMealCalculation.Controls.Add(btnCalculate);
            pnlMealCalculation.Controls.Add(dtpTo);
            pnlMealCalculation.Controls.Add(lblTo);
            pnlMealCalculation.Controls.Add(dtpFrom);
            pnlMealCalculation.Controls.Add(lblFrom);
            pnlMealCalculation.Controls.Add(lblTitle);
            pnlMealCalculation.Location = new Point(30, 58);
            pnlMealCalculation.Name = "pnlMealCalculation";
            pnlMealCalculation.Size = new Size(850, 65);
            pnlMealCalculation.TabIndex = 0;
            // 
            // lblTitle
            // 
            lblTitle.AutoSize = true;
            lblTitle.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblTitle.Location = new Point(15, 22);
            lblTitle.Name = "lblTitle";
            lblTitle.Size = new Size(122, 20);
            lblTitle.TabIndex = 0;
            lblTitle.Text = "PERIOD FILTER:";
            // 
            // lblFrom
            // 
            lblFrom.AutoSize = true;
            lblFrom.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblFrom.ForeColor = Color.FromArgb(71, 85, 105);
            lblFrom.Location = new Point(148, 22);
            lblFrom.Name = "lblFrom";
            lblFrom.Size = new Size(51, 21);
            lblFrom.TabIndex = 1;
            lblFrom.Text = "From:";
            // 
            // dtpFrom
            // 
            dtpFrom.CustomFormat = "dd-MM-yyyy";
            dtpFrom.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dtpFrom.Format = DateTimePickerFormat.Custom;
            dtpFrom.Location = new Point(203, 18);
            dtpFrom.Name = "dtpFrom";
            dtpFrom.Size = new Size(140, 29);
            dtpFrom.TabIndex = 2;
            // 
            // lblTo
            // 
            lblTo.AutoSize = true;
            lblTo.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTo.ForeColor = Color.FromArgb(71, 85, 105);
            lblTo.Location = new Point(365, 22);
            lblTo.Name = "lblTo";
            lblTo.Size = new Size(31, 21);
            lblTo.TabIndex = 3;
            lblTo.Text = "To:";
            // 
            // dtpTo
            // 
            dtpTo.CustomFormat = "dd-MM-yyyy";
            dtpTo.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dtpTo.Format = DateTimePickerFormat.Custom;
            dtpTo.Location = new Point(402, 18);
            dtpTo.Name = "dtpTo";
            dtpTo.Size = new Size(140, 29);
            dtpTo.TabIndex = 4;
            // 
            // btnCalculate
            // 
            btnCalculate.Anchor = AnchorStyles.Top | AnchorStyles.Right;
            btnCalculate.BackColor = Color.FromArgb(37, 99, 235);
            btnCalculate.Cursor = Cursors.Hand;
            btnCalculate.FlatAppearance.BorderSize = 0;
            btnCalculate.FlatStyle = FlatStyle.Flat;
            btnCalculate.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnCalculate.ForeColor = Color.White;
            btnCalculate.Location = new Point(660, 14);
            btnCalculate.Name = "btnCalculate";
            btnCalculate.Size = new Size(170, 36);
            btnCalculate.TabIndex = 5;
            btnCalculate.Text = "⚡ Calculate";
            btnCalculate.UseVisualStyleBackColor = false;
            btnCalculate.Click += btnCalculate_Click;
            // 
            // tblSummaryDeck
            // 
            tblSummaryDeck.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            tblSummaryDeck.ColumnCount = 3;
            tblSummaryDeck.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33333F));
            tblSummaryDeck.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33333F));
            tblSummaryDeck.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 33.33334F));
            tblSummaryDeck.Controls.Add(pnlSummaryCost, 0, 0);
            tblSummaryDeck.Controls.Add(pnlSummaryMeals, 1, 0);
            tblSummaryDeck.Controls.Add(pnlSummaryRate, 2, 0);
            tblSummaryDeck.Location = new Point(30, 130);
            tblSummaryDeck.Name = "tblSummaryDeck";
            tblSummaryDeck.RowCount = 1;
            tblSummaryDeck.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));
            tblSummaryDeck.Size = new Size(850, 95);
            tblSummaryDeck.TabIndex = 1;
            // 
            // pnlSummaryCost
            // 
            pnlSummaryCost.BackColor = Color.White;
            pnlSummaryCost.BorderStyle = BorderStyle.FixedSingle;
            pnlSummaryCost.Controls.Add(lblTotalMarketCost);
            pnlSummaryCost.Controls.Add(lblTotalMarketCostTitle);
            pnlSummaryCost.Dock = DockStyle.Fill;
            pnlSummaryCost.Location = new Point(3, 3);
            pnlSummaryCost.Margin = new Padding(3, 3, 8, 3);
            pnlSummaryCost.Name = "pnlSummaryCost";
            pnlSummaryCost.Size = new Size(272, 89);
            pnlSummaryCost.TabIndex = 0;
            // 
            // lblTotalMarketCostTitle
            // 
            lblTotalMarketCostTitle.AutoSize = true;
            lblTotalMarketCostTitle.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMarketCostTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblTotalMarketCostTitle.Location = new Point(15, 15);
            lblTotalMarketCostTitle.Name = "lblTotalMarketCostTitle";
            lblTotalMarketCostTitle.Size = new Size(160, 20);
            lblTotalMarketCostTitle.TabIndex = 0;
            lblTotalMarketCostTitle.Text = "TOTAL MARKET COST";
            // 
            // lblTotalMarketCost
            // 
            lblTotalMarketCost.AutoSize = true;
            lblTotalMarketCost.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMarketCost.ForeColor = Color.FromArgb(15, 23, 42);
            lblTotalMarketCost.Location = new Point(15, 38);
            lblTotalMarketCost.Name = "lblTotalMarketCost";
            lblTotalMarketCost.Size = new Size(88, 37);
            lblTotalMarketCost.TabIndex = 1;
            lblTotalMarketCost.Text = "৳0.00";
            // 
            // pnlSummaryMeals
            // 
            pnlSummaryMeals.BackColor = Color.White;
            pnlSummaryMeals.BorderStyle = BorderStyle.FixedSingle;
            pnlSummaryMeals.Controls.Add(lblTotalMeals);
            pnlSummaryMeals.Controls.Add(lblTotalMealsTitle);
            pnlSummaryMeals.Dock = DockStyle.Fill;
            pnlSummaryMeals.Location = new Point(286, 3);
            pnlSummaryMeals.Margin = new Padding(3, 3, 8, 3);
            pnlSummaryMeals.Name = "pnlSummaryMeals";
            pnlSummaryMeals.Size = new Size(272, 89);
            pnlSummaryMeals.TabIndex = 1;
            // 
            // lblTotalMealsTitle
            // 
            lblTotalMealsTitle.AutoSize = true;
            lblTotalMealsTitle.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMealsTitle.ForeColor = Color.FromArgb(100, 116, 139);
            lblTotalMealsTitle.Location = new Point(15, 15);
            lblTotalMealsTitle.Name = "lblTotalMealsTitle";
            lblTotalMealsTitle.Size = new Size(189, 20);
            lblTotalMealsTitle.TabIndex = 2;
            lblTotalMealsTitle.Text = "TOTAL MEALS CONSUMED";
            // 
            // lblTotalMeals
            // 
            lblTotalMeals.AutoSize = true;
            lblTotalMeals.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTotalMeals.ForeColor = Color.FromArgb(217, 119, 6);
            lblTotalMeals.Location = new Point(15, 38);
            lblTotalMeals.Name = "lblTotalMeals";
            lblTotalMeals.Size = new Size(32, 37);
            lblTotalMeals.TabIndex = 3;
            lblTotalMeals.Text = "0";
            // 
            // pnlSummaryRate
            // 
            pnlSummaryRate.BackColor = Color.White;
            pnlSummaryRate.BorderStyle = BorderStyle.FixedSingle;
            pnlSummaryRate.Controls.Add(lblMealRate);
            pnlSummaryRate.Controls.Add(lblMealRateTitle);
            pnlSummaryRate.Dock = DockStyle.Fill;
            pnlSummaryRate.Location = new Point(569, 3);
            pnlSummaryRate.Name = "pnlSummaryRate";
            pnlSummaryRate.Size = new Size(278, 89);
            pnlSummaryRate.TabIndex = 2;
            // 
            // lblMealRateTitle
            // 
            lblMealRateTitle.AutoSize = true;
            lblMealRateTitle.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblMealRateTitle.ForeColor = Color.FromArgb(37, 99, 235);
            lblMealRateTitle.Location = new Point(15, 15);
            lblMealRateTitle.Name = "lblMealRateTitle";
            lblMealRateTitle.Size = new Size(150, 20);
            lblMealRateTitle.TabIndex = 4;
            lblMealRateTitle.Text = "PERIOD MEAL RATE";
            // 
            // lblMealRate
            // 
            lblMealRate.AutoSize = true;
            lblMealRate.Font = new Font("Segoe UI", 18F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblMealRate.ForeColor = Color.FromArgb(37, 99, 235);
            lblMealRate.Location = new Point(15, 36);
            lblMealRate.Name = "lblMealRate";
            lblMealRate.Size = new Size(95, 41);
            lblMealRate.TabIndex = 5;
            lblMealRate.Text = "৳0.00";
            // 
            // dgvReport
            // 
            dgvReport.AllowUserToAddRows = false;
            dgvReport.AllowUserToDeleteRows = false;
            dgvReport.AllowUserToResizeRows = false;
            dgvReport.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dgvReport.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dgvReport.BackgroundColor = Color.White;
            dgvReport.BorderStyle = BorderStyle.FixedSingle;
            dgvReport.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvReport.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dataGridViewCellStyle1.ForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.SelectionBackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.SelectionForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
            dgvReport.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            dgvReport.ColumnHeadersHeight = 38;
            dgvReport.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = Color.White;
            dataGridViewCellStyle2.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dataGridViewCellStyle2.ForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.SelectionBackColor = Color.FromArgb(239, 246, 255);
            dataGridViewCellStyle2.SelectionForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
            dgvReport.DefaultCellStyle = dataGridViewCellStyle2;
            dgvReport.EnableHeadersVisualStyles = false;
            dgvReport.GridColor = Color.FromArgb(226, 232, 240);
            dgvReport.Location = new Point(30, 235);
            dgvReport.MultiSelect = false;
            dgvReport.Name = "dgvReport";
            dgvReport.ReadOnly = true;
            dgvReport.RowHeadersVisible = false;
            dgvReport.RowHeadersWidth = 51;
            dgvReport.RowTemplate.Height = 34;
            dgvReport.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvReport.Size = new Size(850, 380);
            dgvReport.TabIndex = 2;
            // 
            // ReportForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoScroll = true;
            BackColor = Color.FromArgb(248, 250, 252);
            ClientSize = new Size(911, 640);
            Controls.Add(lblPageTitle);
            Controls.Add(dgvReport);
            Controls.Add(tblSummaryDeck);
            Controls.Add(pnlMealCalculation);
            MinimumSize = new Size(700, 500);
            Name = "ReportForm";
            Text = "Calculation & Reports";
            pnlMealCalculation.ResumeLayout(false);
            pnlMealCalculation.PerformLayout();
            tblSummaryDeck.ResumeLayout(false);
            pnlSummaryCost.ResumeLayout(false);
            pnlSummaryCost.PerformLayout();
            pnlSummaryMeals.ResumeLayout(false);
            pnlSummaryMeals.PerformLayout();
            pnlSummaryRate.ResumeLayout(false);
            pnlSummaryRate.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)dgvReport).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblPageTitle;
        private Panel pnlMealCalculation;
        private Label lblTitle;
        private Label lblFrom;
        private DateTimePicker dtpFrom;
        private Label lblTo;
        private DateTimePicker dtpTo;
        private Button btnCalculate;
        private TableLayoutPanel tblSummaryDeck;
        private Panel pnlSummaryCost;
        private Label lblTotalMarketCostTitle;
        private Label lblTotalMarketCost;
        private Panel pnlSummaryMeals;
        private Label lblTotalMealsTitle;
        private Label lblTotalMeals;
        private Panel pnlSummaryRate;
        private Label lblMealRateTitle;
        private Label lblMealRate;
        private DataGridView dgvReport;
    }
}
