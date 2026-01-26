export const headerStyle = {
  width: '100%',
  minHeight: '64px',
  px: 3,
  py: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  /* Theme driven */
  // background: 'var(--header-background-color)',
  color: 'var(--body-text-color)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',

  // borderBottom: '1px solid var(--border-color)',
  // boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
  borderRadius: '0 0 40px 40px',

  position: 'sticky',
  top: 0,
  zIndex: 1100,
};
