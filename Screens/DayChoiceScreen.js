import { Image, ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import data from '../components/matchday.json'

const DayChoiceScreen = ({navigation, route}) => {

    const [matchdayData, setmatchdayData] = useState({})

    useEffect(() => {
        setmatchdayData(Object.values(data))
    }, []);

    //console.log(matchdayData)

    return (
        <View style={styles.container}>
             <ImageBackground 
                style={styles.titlebackground} 
                source={{uri: "https://i.pinimg.com/originals/5c/e6/46/5ce646b91386e769e12aa3f02c8a2a8c.gif"}}
                resizeMode={"cover"}
                >
                <View style={styles.titleView}>
                    <Image source={{ uri: "https://www.pngkey.com/png/full/340-3408257_premier-league-logo-premier-league-logo-png.png" }} style={styles.premLogo}/>
                    <Text style={styles.titleStyle}>Premier League</Text>
                    <Text style={styles.titleStyle3}>Choose Matchday</Text>
                </View> 
            </ImageBackground>
            <FlatList 
            style={styles.flatlist}
            data={matchdayData}
            showsVerticalScrollIndicator={false}
            //refreshing={refreshing}
            //onRefresh={() => {getData}}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity 
                        style={styles.matchdayView}
                        onPress={() => navigation.push("MatchScreen", {paramA: item.matchday})}
                    >
                    <ImageBackground 
                        style={styles.background} 
                        source={{uri: "https://assets.reedpopcdn.com/otw_header.png/BROK/thumbnail/1600x900/quality/100/otw_header.png"}}
                        resizeMode={"cover"}
                        >
                        <Text style={styles.textStyle}>{item.matchday}</Text>
                    </ImageBackground>
                </TouchableOpacity>
        )}
          />
        </View>
      )
}

export default DayChoiceScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    flatlist: {
        width: "100%",
        alignSelf: "center",
        marginBottom: 255,
        backgroundColor: "white"
    },
    premLogo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 40,
        marginBottom: -15,
    },
    titleView: {
        justifyContent: "center",
        backgroundColor: "transparent",
        width: "100%",
        alignSelf: "center",
        height: "auto",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 0.4,
        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    },
    titleStyle: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        color: "#38003c",
        alignSelf: "center",
    },
    titleStyle2: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        color: "grey",
        alignSelf: "center",
        marginTop: 5,
    },
    titleStyle3: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        color: "#38003c",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 10,
    },
        matchdayView: {
        alignSelf: "center",
        backgroundColor: "white",
        height: 100,
        width: "100%",
        alignItems: "center",
        flex: 1,
        marginHorizontal: 10, 
        marginTop: 15, 
        justifyContent: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
            },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 25
    },
    background: {
        height: "100%",
        width: "100%",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "right",
        marginRight: 5
    }
})