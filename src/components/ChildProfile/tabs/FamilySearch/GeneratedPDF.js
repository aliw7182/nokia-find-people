import { Page, Text, View, Document, PDFViewer } from "@react-pdf/renderer";
import { months } from "./";

export const GeneratedPDF = ({ searchResults = [] }) => {
  return (
    <PDFViewer width={"96%"} height={"100%"}>
      <Document>
        <Page size="A4">
          {searchResults.map((item) => item.blocks && <Item item={item} />)}
        </Page>
      </Document>
    </PDFViewer>
  );
};

const Item = ({ item }) => {
  const {
    search_vector,
    blocks,
    user: { first_name, last_name },
    created_at,
  } = item;
  let date = new Date(created_at);
  return (
    <View
      style={{ display: "flex", flexDirection: "row", padding: "10px 10px" }}
    >
      <View style={{ display: "block", marginRight: 10, align: "center" }}>
        <Text style={{ fontSize: 13, fontStyle: "bold" }}>
          {date.getDate()}
        </Text>
        <Text style={{ fontSize: 10, fontStyle: "bold" }}>
          {months[date.getMonth()]}
        </Text>
        <Text style={{ fontSize: 10, fontStyle: "bold" }}>
          {date.getFullYear()}
        </Text>
      </View>
      <View>
        {blocks &&
          JSON.parse(blocks).map((item) => (
            <Text
              style={{
                ...getStyle(item.type),
                display: "block",
                margin: "3px 0px",
              }}
            >
              {item.text}
            </Text>
          ))}
        <Text style={{ fontSize: 8, color: "grey" }}>
          Found via {search_vector.name} by {first_name} {last_name}
        </Text>
      </View>
    </View>
  );
};

const getStyle = (type) => {
  switch (type) {
    case "header-one":
      return { fontSize: 18, fontStyle: "bold" };
    case "header-two":
      return { fontSize: 15 };
    case "header-three":
      return { fontSize: 12 };
    case "unordered-list-item":
      return { fontSize: 10 };
    case "ordered-list-item":
      return { fontSize: 10 };
    default:
      return { fontSize: 10 };
  }
};
