import Spinner from "@atlaskit/spinner";

export const Preloader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100%",
      width: "100%"
    }}
  >
    <Spinner size="large" />
  </div>
)
