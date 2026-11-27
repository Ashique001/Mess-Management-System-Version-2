namespace MessMealManagement
{
    partial class DepositeForm
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
            lblMember = new Label();
            cmbMember = new ComboBox();
            lblDepositeDate = new Label();
            dtpDepositDate = new DateTimePicker();
            lblAmount = new Label();
            txtAmount = new TextBox();
            btnAdd = new Button();
            btnDelete = new Button();
            btnUpdate = new Button();
            btnClear = new Button();
            dgvDeposits = new DataGridView();
            pnlDepositInput = new Panel();
            lblFormSection = new Label();
            pnlDepositGrid = new Panel();
            lblGridSection = new Label();
            ((System.ComponentModel.ISupportInitialize)dgvDeposits).BeginInit();
            pnlDepositInput.SuspendLayout();
            pnlDepositGrid.SuspendLayout();
            SuspendLayout();
            // 
            // lblTitle
            // 
            lblTitle.AutoSize = true;
            lblTitle.Font = new Font("Segoe UI", 16F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblTitle.ForeColor = Color.FromArgb(15, 23, 42);
            lblTitle.Location = new Point(30, 20);
            lblTitle.Name = "lblTitle";
            lblTitle.Size = new Size(480, 37);
            lblTitle.TabIndex = 0;
            lblTitle.Text = "💳 MEMBER DEPOSIT MANAGEMENT";
            // 
            // pnlDepositInput
            // 
            pnlDepositInput.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left;
            pnlDepositInput.BackColor = Color.White;
            pnlDepositInput.BorderStyle = BorderStyle.FixedSingle;
            pnlDepositInput.Controls.Add(lblFormSection);
            pnlDepositInput.Controls.Add(lblMember);
            pnlDepositInput.Controls.Add(cmbMember);
            pnlDepositInput.Controls.Add(lblDepositeDate);
            pnlDepositInput.Controls.Add(dtpDepositDate);
            pnlDepositInput.Controls.Add(lblAmount);
            pnlDepositInput.Controls.Add(txtAmount);
            pnlDepositInput.Controls.Add(btnAdd);
            pnlDepositInput.Controls.Add(btnUpdate);
            pnlDepositInput.Controls.Add(btnDelete);
            pnlDepositInput.Controls.Add(btnClear);
            pnlDepositInput.Location = new Point(30, 68);
            pnlDepositInput.Name = "pnlDepositInput";
            pnlDepositInput.Size = new Size(330, 550);
            pnlDepositInput.TabIndex = 1;
            // 
            // lblFormSection
            // 
            lblFormSection.AutoSize = true;
            lblFormSection.Font = new Font("Segoe UI", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblFormSection.ForeColor = Color.FromArgb(100, 116, 139);
            lblFormSection.Location = new Point(20, 16);
            lblFormSection.Name = "lblFormSection";
            lblFormSection.Size = new Size(187, 23);
            lblFormSection.TabIndex = 0;
            lblFormSection.Text = "NEW DEPOSIT ENTRY";
            // 
            // lblMember
            // 
            lblMember.AutoSize = true;
            lblMember.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblMember.ForeColor = Color.FromArgb(71, 85, 105);
            lblMember.Location = new Point(20, 55);
            lblMember.Name = "lblMember";
            lblMember.Size = new Size(122, 21);
            lblMember.TabIndex = 1;
            lblMember.Text = "Select Member:";
            // 
            // cmbMember
            // 
            cmbMember.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            cmbMember.DropDownStyle = ComboBoxStyle.DropDownList;
            cmbMember.Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point, 0);
            cmbMember.FormattingEnabled = true;
            cmbMember.Location = new Point(20, 80);
            cmbMember.Name = "cmbMember";
            cmbMember.Size = new Size(285, 31);
            cmbMember.TabIndex = 2;
            // 
            // lblDepositeDate
            // 
            lblDepositeDate.AutoSize = true;
            lblDepositeDate.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblDepositeDate.ForeColor = Color.FromArgb(71, 85, 105);
            lblDepositeDate.Location = new Point(20, 125);
            lblDepositeDate.Name = "lblDepositeDate";
            lblDepositeDate.Size = new Size(108, 21);
            lblDepositeDate.TabIndex = 3;
            lblDepositeDate.Text = "Deposit Date:";
            // 
            // dtpDepositDate
            // 
            dtpDepositDate.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            dtpDepositDate.Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dtpDepositDate.Format = DateTimePickerFormat.Short;
            dtpDepositDate.Location = new Point(20, 150);
            dtpDepositDate.Name = "dtpDepositDate";
            dtpDepositDate.Size = new Size(285, 30);
            dtpDepositDate.TabIndex = 4;
            // 
            // lblAmount
            // 
            lblAmount.AutoSize = true;
            lblAmount.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblAmount.ForeColor = Color.FromArgb(71, 85, 105);
            lblAmount.Location = new Point(20, 195);
            lblAmount.Name = "lblAmount";
            lblAmount.Size = new Size(160, 21);
            lblAmount.TabIndex = 5;
            lblAmount.Text = "Deposit Amount (৳):";
            // 
            // txtAmount
            // 
            txtAmount.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            txtAmount.BorderStyle = BorderStyle.FixedSingle;
            txtAmount.Font = new Font("Segoe UI Semibold", 10.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            txtAmount.Location = new Point(20, 220);
            txtAmount.Name = "txtAmount";
            txtAmount.Size = new Size(285, 31);
            txtAmount.TabIndex = 6;
            // 
            // btnAdd
            // 
            btnAdd.BackColor = Color.FromArgb(5, 150, 105);
            btnAdd.Cursor = Cursors.Hand;
            btnAdd.FlatAppearance.BorderSize = 0;
            btnAdd.FlatStyle = FlatStyle.Flat;
            btnAdd.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnAdd.ForeColor = Color.White;
            btnAdd.Location = new Point(20, 280);
            btnAdd.Name = "btnAdd";
            btnAdd.Size = new Size(135, 38);
            btnAdd.TabIndex = 7;
            btnAdd.Text = "Save Deposit";
            btnAdd.UseVisualStyleBackColor = false;
            btnAdd.Click += btnAdd_Click;
            // 
            // btnUpdate
            // 
            btnUpdate.BackColor = Color.FromArgb(241, 245, 249);
            btnUpdate.Cursor = Cursors.Hand;
            btnUpdate.FlatAppearance.BorderColor = Color.FromArgb(203, 213, 225);
            btnUpdate.FlatStyle = FlatStyle.Flat;
            btnUpdate.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnUpdate.ForeColor = Color.FromArgb(30, 41, 59);
            btnUpdate.Location = new Point(170, 280);
            btnUpdate.Name = "btnUpdate";
            btnUpdate.Size = new Size(135, 38);
            btnUpdate.TabIndex = 8;
            btnUpdate.Text = "Update";
            btnUpdate.UseVisualStyleBackColor = false;
            btnUpdate.Click += btnUpdate_Click;
            // 
            // btnDelete
            // 
            btnDelete.BackColor = Color.FromArgb(254, 242, 242);
            btnDelete.Cursor = Cursors.Hand;
            btnDelete.FlatAppearance.BorderColor = Color.FromArgb(254, 202, 202);
            btnDelete.FlatStyle = FlatStyle.Flat;
            btnDelete.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnDelete.ForeColor = Color.FromArgb(220, 38, 38);
            btnDelete.Location = new Point(20, 330);
            btnDelete.Name = "btnDelete";
            btnDelete.Size = new Size(135, 38);
            btnDelete.TabIndex = 9;
            btnDelete.Text = "Delete";
            btnDelete.UseVisualStyleBackColor = false;
            btnDelete.Click += btnDelete_Click;
            // 
            // btnClear
            // 
            btnClear.BackColor = Color.White;
            btnClear.Cursor = Cursors.Hand;
            btnClear.FlatAppearance.BorderColor = Color.FromArgb(203, 213, 225);
            btnClear.FlatStyle = FlatStyle.Flat;
            btnClear.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnClear.ForeColor = Color.FromArgb(100, 116, 139);
            btnClear.Location = new Point(170, 330);
            btnClear.Name = "btnClear";
            btnClear.Size = new Size(135, 38);
            btnClear.TabIndex = 10;
            btnClear.Text = "Clear";
            btnClear.UseVisualStyleBackColor = false;
            btnClear.Click += btnClear_Click;
            // 
            // pnlDepositGrid
            // 
            pnlDepositGrid.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            pnlDepositGrid.BackColor = Color.White;
            pnlDepositGrid.BorderStyle = BorderStyle.FixedSingle;
            pnlDepositGrid.Controls.Add(lblGridSection);
            pnlDepositGrid.Controls.Add(dgvDeposits);
            pnlDepositGrid.Location = new Point(380, 68);
            pnlDepositGrid.Name = "pnlDepositGrid";
            pnlDepositGrid.Size = new Size(500, 550);
            pnlDepositGrid.TabIndex = 2;
            // 
            // lblGridSection
            // 
            lblGridSection.AutoSize = true;
            lblGridSection.Font = new Font("Segoe UI", 10F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblGridSection.ForeColor = Color.FromArgb(100, 116, 139);
            lblGridSection.Location = new Point(15, 16);
            lblGridSection.Name = "lblGridSection";
            lblGridSection.Size = new Size(276, 23);
            lblGridSection.TabIndex = 0;
            lblGridSection.Text = "DEPOSIT TRANSACTION HISTORY";
            // 
            // dgvDeposits
            // 
            dgvDeposits.AllowUserToAddRows = false;
            dgvDeposits.AllowUserToDeleteRows = false;
            dgvDeposits.AllowUserToResizeRows = false;
            dgvDeposits.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dgvDeposits.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dgvDeposits.BackgroundColor = Color.White;
            dgvDeposits.BorderStyle = BorderStyle.None;
            dgvDeposits.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
            dgvDeposits.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point, 0);
            dataGridViewCellStyle1.ForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.SelectionBackColor = Color.FromArgb(241, 245, 249);
            dataGridViewCellStyle1.SelectionForeColor = Color.FromArgb(71, 85, 105);
            dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
            dgvDeposits.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            dgvDeposits.ColumnHeadersHeight = 36;
            dgvDeposits.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = Color.White;
            dataGridViewCellStyle2.Font = new Font("Segoe UI", 9.5F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dataGridViewCellStyle2.ForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.SelectionBackColor = Color.FromArgb(239, 246, 255);
            dataGridViewCellStyle2.SelectionForeColor = Color.FromArgb(15, 23, 42);
            dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
            dgvDeposits.DefaultCellStyle = dataGridViewCellStyle2;
            dgvDeposits.EnableHeadersVisualStyles = false;
            dgvDeposits.GridColor = Color.FromArgb(226, 232, 240);
            dgvDeposits.Location = new Point(15, 50);
            dgvDeposits.MultiSelect = false;
            dgvDeposits.Name = "dgvDeposits";
            dgvDeposits.ReadOnly = true;
            dgvDeposits.RowHeadersVisible = false;
            dgvDeposits.RowHeadersWidth = 51;
            dgvDeposits.RowTemplate.Height = 34;
            dgvDeposits.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvDeposits.Size = new Size(468, 480);
            dgvDeposits.TabIndex = 11;
            dgvDeposits.CellClick += dgvDeposits_CellClick;
            // 
            // DepositeForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoScroll = true;
            BackColor = Color.FromArgb(248, 250, 252);
            ClientSize = new Size(911, 640);
            Controls.Add(pnlDepositGrid);
            Controls.Add(pnlDepositInput);
            Controls.Add(lblTitle);
            MinimumSize = new Size(700, 500);
            Name = "DepositeForm";
            Text = "Deposit Management";
            ((System.ComponentModel.ISupportInitialize)dgvDeposits).EndInit();
            pnlDepositInput.ResumeLayout(false);
            pnlDepositInput.PerformLayout();
            pnlDepositGrid.ResumeLayout(false);
            pnlDepositGrid.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label lblTitle;
        private Label lblMember;
        private ComboBox cmbMember;
        private Label lblDepositeDate;
        private DateTimePicker dtpDepositDate;
        private Label lblAmount;
        private TextBox txtAmount;
        private Button btnAdd;
        private Button btnDelete;
        private Button btnUpdate;
        private Button btnClear;
        private DataGridView dgvDeposits;
        private Panel pnlDepositInput;
        private Label lblFormSection;
        private Panel pnlDepositGrid;
        private Label lblGridSection;
    }
}
