import { Page, Text, View, Document, StyleSheet, Canvas } from '@react-pdf/renderer';
import { people } from './testdata';

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    }
});

// function DataTable() {
//     return (

//     );
// }

export const MyDocument = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page} >
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Fname</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Lname</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Email</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Gender</Text></View>
                </View>
                {people.map((person) => (
                    <View style={styles.tableRow} key={person.id}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{person.first_name}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{person.last_name}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{person.email}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{person.gender}</Text></View>
                    </View>
                ))}
            </View>
                <Text
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                />
            </Page>
        </Document>
    );
}

