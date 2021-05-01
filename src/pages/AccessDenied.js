export const AccessDenied = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100%",
      width: "100%"
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <h4>Access was denied</h4>
      <span>You don't have permission to view this page</span>
    </div>
  </div>
)
