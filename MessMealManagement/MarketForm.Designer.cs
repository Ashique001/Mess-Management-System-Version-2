namespace MessMealManagement
{
    partial class MarketForm
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
            dtpExpenseDate = new DateTimePicker();
            lblAmount = new Label();
            txtAmount = new TextBox();
            lblDescription = new Label();
            txtDescription = new TextBox();
            btnSave = new Button();
            dgvExpenses = new DataGridView();
            btnUpdate = new Button();
            btnDelete = new Button();
            btnClear = new Button();
            pnlExpenseInput = new Panel();
            lblFormSection = new Label();
            pnlExpenseGrid = new Panel();
            lblGridSection = new Label();
            ((System.ComponentModel.ISupportInitialize)dgvExpenses).BeginInit();
            pnlExpenseInput.SuspendLayout();
            pnlExpenseGrid.SuspendLayout();
            SuspendLayout();
            // 
            // lblTitle
            // 
            lblTitle.AutoSize = true;
            lblTitle.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblTitle.Location = new Point(30, 20);
            lblTitle.Name = "lblTitle";
            lblTitle.Size = new Size(420, 37);
            lblTitle.TabIndex = 0;
            lblTitle.Text = "🛒 MARKET & BAZAR EXPENSES";
            // 
            // pnlExpenseInput
            // 
            pnlExpenseInput.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left;
            pnlExpenseInput.BackColor = Color.White;
            pnlExpenseInput.BorderStyle = BorderStyle.FixedSingle;
            pnlExpenseInput.Controls.Add(lblFormSection);
            pnlExpenseInput.Controls.Add(lblDate);
            pnlExpenseInput.Controls.Add(dtpExpenseDate);
            pnlExpenseInput.Controls.Add(lblAmount);
            pnlExpenseInput.Controls.Add(txtAmount);
            pnlExpenseInput.Controls.Add(lblDescription);
            pnlExpenseInput.Controls.Add(txtDescription);
            pnlExpenseInput.Controls.Add(btnSave);
            pnlExpenseInput.Controls.Add(btnUpdate);
            pnlExpenseInput.Controls.Add(btnDelete);
            pnlExpenseInput.Controls.Add(btnClear);
            pnlExpenseInput.Location = new Point(30, 68);
            pnlExpenseInput.Name = "pnlExpenseInput";
            pnlExpenseInput.Size = new Size(340, 550);
            pnlExpenseInput.TabIndex = 1;
            // 
            // lblFormSection
            // 
            lblFormSection.AutoSize = true;
            lblFormSection.Font = new Font("Segoe UI", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblFormSection.ForeColor = Color.FromArgb(100, 116, 139);
            lblFormSection.Location = new Point(20, 16);
            lblFormSection.Name = "lblFormSection";
            lblFormSection.Size = new Size(204, 23);
            lblFormSection.TabIndex = 0;
            lblFormSection.Text = "RECORD BAZAR EXPENSE";
            // 
            // lblDate
            // 
            lblDate.AutoSize = true;
            lblDate.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblDate.ForeColor = Color.FromArgb(71, 85, 105);
            lblDate.Location = new Point(20, 52);
            lblDate.Name = "lblDate";
            lblDate.Size = new Size(111, 21);
            lblDate.TabIndex = 1;
            lblDate.Text = "Expense Date:";
            // 
            // dtpExpenseDate
            // 
            dtpExpenseDate.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            dtpExpenseDate.Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dtpExpenseDate.Format = DateTimePickerFormat.Short;
            dtpExpenseDate.Location = new Point(20, 75);
            dtpExpenseDate.Name = "dtpExpenseDate";
            dtpExpenseDate.Size = new Size(295, 30);
            dtpExpenseDate.TabIndex = 2;
            // 
            // lblAmount
            // 
            lblAmount.AutoSize = true;
            lblAmount.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblAmount.ForeColor = Color.FromArgb(71, 85, 105);
            lblAmount.Location = new Point(20, 115);
            lblAmount.Name = "lblAmount";
            lblAmount.Size = new Size(149, 21);
            lblAmount.TabIndex = 3;
            lblAmount.Text = "Amount Spent (৳):";
            // 
            // txtAmount
            // 
            txtAmount.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            txtAmount.BorderStyle = BorderStyle.FixedSingle;
            txtAmount.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            txtAmount.Location = new Point(20, 138);
            txtAmount.Name = "txtAmount";
            txtAmount.Size = new Size(295, 31);
            txtAmount.TabIndex = 4;
            // 
            // lblDescription
            // 
            lblDescription.AutoSize = true;
            lblDescription.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblDescription.ForeColor = Color.FromArgb(71, 85, 105);
            lblDescription.Location = new Point(20, 180);
            lblDescription.Name = "lblDescription";
            lblDescription.Size = new Size(211, 21);
            lblDescription.TabIndex = 5;
            lblDescription.Text = "Bazar Items / Description:";
            // 
            // txtDescription
            // 
            txtDescription.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            txtDescription.BorderStyle = BorderStyle.FixedSingle;
            txtDescription.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            txtDescription.Location = new Point(20, 204);
            txtDescription.Multiline = true;
            txtDescription.Name = "txtDescription";
            txtDescription.ScrollBars = ScrollBars.Vertical;
            txtDescription.Size = new Size(295, 130);
            txtDescription.TabIndex = 6;
            // 
            // btnSave
            // 
            btnSave.Anchor = AnchorStyles.Bottom | AnchorStyles.Left;
            btnSave.BackColor = Color.FromArgb(37, 99, 235);
            btnSave.Cursor = Cursors.Hand;
            btnSave.FlatAppearance.BorderSize = 0;
            btnSave.FlatStyle = FlatStyle.Flat;
            btnSave.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnSave.ForeColor = Color.White;
            btnSave.Location = new Point(20, 355);
            btnSave.Name = "btnSave";
            btnSave.Size = new Size(140, 38);
            btnSave.TabIndex = 7;
            btnSave.Text = "Save Expense";
            btnSave.UseVisualStyleBackColor = false;
            btnSave.Click += btnSave_Click;
            // 
            // btnUpdate
            // 
            btnUpdate.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnUpdate.BackColor = Color.FromArgb(241, 245, 249);
            btnUpdate.Cursor = Cursors.Hand;
            btnUpdate.FlatAppearance.BorderColor = Color.FromArgb(203, 213, 225);
            btnUpdate.FlatStyle = FlatStyle.Flat;
            btnUpdate.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnUpdate.ForeColor = Color.FromArgb(30, 41, 59);
            btnUpdate.Location = new Point(175, 355);
            btnUpdate.Name = "btnUpdate";
            btnUpdate.Size = new Size(140, 38);
            btnUpdate.TabIndex = 9;
            btnUpdate.Text = "Update";
            btnUpdate.UseVisualStyleBackColor = false;
            btnUpdate.Click += btnUpdate_Click;
            // 
            // btnDelete
            // 
            btnDelete.Anchor = AnchorStyles.Bottom | AnchorStyles.Left;
            btnDelete.BackColor = Color.FromArgb(254, 242, 242);
            btnDelete.Cursor = Cursors.Hand;
            btnDelete.FlatAppearance.BorderColor = Color.FromArgb(254, 202, 202);
            btnDelete.FlatStyle = FlatStyle.Flat;
            btnDelete.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnDelete.ForeColor = Color.FromArgb(220, 38, 38);
            btnDelete.Location = new Point(20, 405);
            btnDelete.Name = "btnDelete";
            btnDelete.Size = new Size(140, 38);
            btnDelete.TabIndex = 10;
            btnDelete.Text = "Delete";
            btnDelete.UseVisualStyleBackColor = false;
            btnDelete.Click += btnDelete_Click;
            // 
            // btnClear
            // 
            btnClear.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnClear.BackColor = Color.White;
            btnClear.Cursor = Cursors.Hand;
            btnClear.FlatAppearance.BorderColor = Color.FromArgb(203, 213, 225);
            btnClear.FlatStyle = FlatStyle.Flat;
            btnClear.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnClear.ForeColor = Color.FromArgb(100, 116, 139);
            btnClear.Location = new Point(175, 405);
            btnClear.Name = "btnClear";
            btnClear.Size = new Size(140, 38);
            btnClear.TabIndex = 11;
            btnClear.Text = "Clear";
            btnClear.UseVisualStyleBackColor = false;
            btnClear.Click += btnClear_Click;
            // 
            // pnlExpenseGrid
            // 
            pnlExpenseGrid.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            pnlExpenseGrid.BackColor = Color.White;
            pnlExpenseGrid.BorderStyle = BorderStyle.FixedSingle;
            pnlExpenseGrid.Controls.Add(lblGridSection);
            pnlExpenseGrid.Controls.Add(dgvExpenses);
            pnlExpenseGrid.Location = new Point(390, 68);
            pnlExpenseGrid.Name = "pnlExpenseGrid";
            pnlExpenseGrid.Size = new Size(490, 550);
            pnlExpenseGrid.TabIndex = 2;
            // 
            // lblGridSection
            // 
            lblGridSection.AutoSize = true;
            lblGridSection.Font = new Font("Segoe UI", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblGridSection.ForeColor = Color.FromArgb(100, 116, 139);
            lblGridSection.Location = new Point(15, 16);
            lblGridSection.Name = "lblGridSection";
            lblGridSection.Size = new Size(244, 23);
            lblGridSection.TabIndex = 0;
            lblGridSection.Text = "GROCERY BAZAR VOUCHERS";
            // 
            // dgvExpenses
            // 
            dgvExpenses.AllowUserToAddRows = false;
            dgvExpenses.AllowUserToDeleteRows = false;
            dgvExpenses.AllowUserToResizeRows = false;
            dgvExpenses.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dgvExpenses.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dgvExpenses.BackgroundColor = Color.White;
            dgvExpenses.BorderStyle = BorderStyle.None;
            dgvExpenses.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvExpenses.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dataGridViewCellStyle1.ForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.SelectionBackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.SelectionForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
            dgvExpenses.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            dgvExpenses.ColumnHeadersHeight = 36;
            dgvExpenses.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = Color.White;
            dataGridViewCellStyle2.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dataGridViewCellStyle2.ForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.SelectionBackColor = Color.FromArgb(239, 246, 255);
            dataGridViewCellStyle2.SelectionForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
            dgvExpenses.DefaultCellStyle = dataGridViewCellStyle2;
            dgvExpenses.EnableHeadersVisualStyles = false;
            dgvExpenses.GridColor = Color.FromArgb(226, 232, 240);
            dgvExpenses.Location = new Point(15, 50);
            dgvExpenses.MultiSelect = false;
            dgvExpenses.Name = "dgvExpenses";
            dgvExpenses.ReadOnly = true;
            dgvExpenses.RowHeadersVisible = false;
            dgvExpenses.RowHeadersWidth = 51;
            dgvExpenses.RowTemplate.Height = 34;
            dgvExpenses.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvExpenses.Size = new Size(458, 480);
            dgvExpenses.TabIndex = 8;
            dgvExpenses.CellClick += dgvExpenses_CellClick;
            // 
            // MarketForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoScroll = true;
            BackColor = Color.FromArgb(248, 250, 252);
            ClientSize = new Size(911, 640);
            Controls.Add(pnlExpenseGrid);
            Controls.Add(pnlExpenseInput);
            Controls.Add(lblTitle);
            MinimumSize = new Size(700, 500);
            Name = "MarketForm";
            Text = "Market Expenses";
            ((System.ComponentModel.ISupportInitialize)dgvExpenses).EndInit();
            pnlExpenseInput.ResumeLayout(false);
            pnlExpenseInput.PerformLayout();
            pnlExpenseGrid.ResumeLayout(false);
            pnlExpenseGrid.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblTitle;
        private Label lblDate;
        private DateTimePicker dtpExpenseDate;
        private Label lblAmount;
        private TextBox txtAmount;
        private Label lblDescription;
        private TextBox txtDescription;
        private Button btnSave;
        private DataGridView dgvExpenses;
        private Button btnUpdate;
        private Button btnDelete;
        private Button btnClear;
        private Panel pnlExpenseInput;
        private Label lblFormSection;
        private Panel pnlExpenseGrid;
        private Label lblGridSection;
    }
}
