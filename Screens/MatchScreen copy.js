import { Image, ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, SectionList  } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { SvgUri } from 'react-native-svg'; 

const MatchScreen = () => {

    const [matchData, setmatchData] = useState({})

    useEffect(() => {
        const getMatchData = async () => {
            await axios
            ({
                method: 'get',
                url: 'https://api.football-data.org/v4/competitions/PL/matches',
                headers: {"X-Auth-Token": "a15a58c93e3446f28dbe7643924532d1"}
                })
                .then(function (response) {
                //console.log(response.data.matches);
                setmatchData(Object.values(response.data.matches))
                })
                .catch(error => {
                console.log(error)
            });
        }
        getMatchData(); 
    }, []);

    const hasCorrectImageHome = (imagePath) => {
        if (imagePath != null) {
            let IP = imagePath;
            IP = IP.split(".")
            //console.log(IP[3])
            if ( IP[3] == "png" ) {
                IP = IP.join(".")
                //console.log(IP)
                return (
                    <Image style={styles.logoHome} source={{uri: IP}}></Image>
                )
            } else if ( IP[3] == "svg" ) {
                IP = IP.join(".")
                //console.log(IP)
                return (
                    //<Image style={styles.logoHome} source={{uri: IP}}></Image>
                    <SvgUri style={styles.logoHome} width="30" height="30" uri={IP} />
                )
            }
        }
    }

    const hasCorrectImageAway = (imagePath) => {
        if (imagePath != null) {
            let IP = imagePath;
            IP = IP.split(".")
            //console.log(IP[3])
            if ( IP[3] == "png" ) {
                IP = IP.join(".")
                //console.log(IP)
                return (
                    <Image style={styles.logoAway} source={{uri: IP}}></Image>
                )
            } else if ( IP[3] == "svg" ) {
                IP = IP.join(".")
                //console.log(IP)
                return (
                    //<Image style={styles.logoHome} source={{uri: IP}}></Image>
                    <SvgUri style={styles.logoAway} width="30" height="30" uri={IP} />
                )
            }
        }
    }

    const isFinished = (status, dateTime) => {
        if (status != null) {
            let ST = status;
            if ( ST === "FINISHED" ) {
                return (
                    <Text style={styles.dtTextFullTime}>Full-Time</Text>
                )
            } else if ( ST === "POSTPONED" ) {
                return (
                    <Text style={styles.dtTextPostponed}>Postponed</Text>
                )
            } else if ( ST === "TIMED" ) {
                if (dateTime != null) {
                    let dt = dateTime;
                    if (dt.includes("T")){
                        dt = dt.replace("T", " ");
                        dt = dt.replace("Z", " ");
                        dt = dt.split(" ")
                        dt = dt[1]
                        dt = dt.split(":")
                        dt.pop()
                        dt = dt.join(":")
                    } 
                    return (
                        <Text style={styles.dtTextTimed}>{dt}</Text>
                    )
                }
            } else if ( ST === "SCHEDULED" ) {
                if (dateTime != null) {
                    let dt = dateTime;
                    if (dt.includes("T")){
                        dt = dt.replace("T", " ");
                        dt = dt.replace("Z", " ");
                        dt = dt.split(" ")
                        //console.log(dt)
                        dt = dt[0]
                        // dt = dt.split(":")
                        // console.log(dt)
                        // dt.pop()
                        // dt = dt.join(":")
                    } 
                    return (
                        <Text style={styles.dtTextTimed}>{dt}</Text>
                    )
                }
            }
        }
    }

    let num = 0

    //console.log(matchData)

  return (
    <View style={styles.container}>
    <View style={styles.titleView}>
        <Image source={{ uri: "https://www.pngkey.com/png/full/340-3408257_premier-league-logo-premier-league-logo-png.png" }} style={styles.premLogo}/>
        <Text style={styles.titleStyle}>Premier League</Text>
        <Text style={styles.titleStyle2}>England</Text>
    </View>
      <FlatList 
        style={styles.flatlist}
        data={matchData}
        showsVerticalScrollIndicator={false}
        //refreshing={refreshing}
        //onRefresh={() => {getData}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
            //console.log(item)
            if (item.matchday === 20 && item.matchday == num){
                return (
                    <TouchableOpacity>
                        <View style={styles.matchView}>
                            <View>
                                <View style={styles.row}>
                                    {hasCorrectImageHome(item.homeTeam.crest)}
                                    <Text style={styles.teamHome}>{item.homeTeam.shortName}</Text>
                                    <Text style={styles.scoreHome}>{item.score.fullTime.home}</Text>
                                </View>
                                <View style={styles.row}>
                                    {hasCorrectImageAway(item.awayTeam.crest)}
                                    <Text style={styles.teamAway}>{item.awayTeam.shortName}</Text>
                                    <Text style={styles.scoreAway}>{item.score.fullTime.away}</Text>
                                </View>
                            </View>
                            <View style={styles.dTView}>
                                {isFinished(item.status, item.utcDate)}
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            } else {
                num ++
            }
        }
    }

      />
    </View>
  )
}

export default MatchScreen

const styles = StyleSheet.create({
    premLogo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: -15,
    },
    titleView: {
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%",
        alignSelf: "center",
        height: "auto",
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
        marginBottom: 10,
    },
    flatlist: {
        width: "100%",
        alignSelf: "center",
        marginBottom: 250,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5
    },
    matchView: {
        flexDirection: "row",
        width: "90%",
        height: "auto",
        borderTopWidth: 1,
        borderTopColor: "lightgrey",
        alignSelf: "center"
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 0,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 10,
        // elevation: 5
    },
    teamHome: {
        marginTop: 30,
        marginLeft: 10
    },
    teamAway: {
        marginTop: 20,
        marginLeft: 10
    },
    logoHome: {
        width: 30,
        height: 30,
        marginLeft: 20,
        marginTop: 20
    },
    logoAway: {
        width: 30,
        height: 30,
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 10

    },
    row: {
        flexDirection: "row",
        width: Dimensions.get('window').width * 0.55
    },
    dTView: {
        width: Dimensions.get('window').width * 0.38,
        height: "70%",
        alignItems: "center",
        borderLeftWidth: 1,
        borderLeftColor: "lightgrey",
        alignSelf: "center",
        alignContent: "center",
    },
    dtTextFullTime: {
        fontSize: 15,
        textAlign: "center",
        color: "grey",
        marginTop: 35
    },
    dtTextPostponed: {
        fontSize: 15,
        textAlign: "center",
        color: "red",
        marginTop: 35
    },
    dtTextTimed: {
        fontSize: 18,
        textAlign: "center",
        color: "black",
        marginTop: 35
    },
    scoreHome: {
        position: "absolute",
        right: 10,
        marginTop: 30,
        fontWeight: "bold"
    },
    scoreAway: {
        position: "absolute",
        right: 10,
        marginTop: 20,
        fontWeight: "bold"
    }
})