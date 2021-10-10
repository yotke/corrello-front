<Popover className="pop-over1"
  open={isOpen}
  onClose={this.handleClose}
  //  autoFocus
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}

>
  <div className="popover-header">
    <h3>{title}</h3>
    <button className="clean-btn" onClick={closePopover}>
      <CloseIcon />
    </button>
  </div>
  {children}
</Popover>