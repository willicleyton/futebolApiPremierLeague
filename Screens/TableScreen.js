import { Image, ScrollView, StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { SvgUri } from 'react-native-svg'; 

const TableScreen = () => {

    const [premierLeague, setPremierLeague] = useState({})
    const [refreshing, setRefreshing] = useState(false);

    const getData = useEffect(() => {
        const getPremierLeague = async () => {
            await axios
            ({
                method: 'get',
                url: 'https://api.football-data.org/v4/competitions/PL/standings',
                headers: {"X-Auth-Token": "a15a58c93e3446f28dbe7643924532d1"}
                })
                .then(function (response) {
                //console.log(response.data.standings[0].table);
                setPremierLeague(Object.values(response.data.standings[0].table))
                //console.log(response.data.standings[0].table[1].team.crest)
                })
                .catch(error => {
                console.log(error)
            });
        }
        getPremierLeague(); 
    }, []);

    //console.log(premierLeague)

  return (
    <View style={styles.container}>
         <ImageBackground 
            style={styles.background} 
            source={{uri: "https://i.pinimg.com/originals/5c/e6/46/5ce646b91386e769e12aa3f02c8a2a8c.gif"}}
            resizeMode={"cover"}
            >
            <View style={styles.titleView}>
                <Image source={{ uri: "https://www.pngkey.com/png/full/340-3408257_premier-league-logo-premier-league-logo-png.png" }} style={styles.premLogo}/>
                <Text style={styles.titleStyle}>Premier League</Text>
            </View> 
        </ImageBackground>
        <FlatList 
        style={styles.flatlist}
        data={premierLeague}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => {getData}}
        keyExtractor={(item) => item.team.id}
        renderItem={({ item }) => {
            if (
                item.team.shortName == "Tottenham" && item.position != "1" && item.position != "2" && item.position != "3" && item.position != "4" && item.position != "5" && item.position != "6" && item.position != "7" && item.position != "8" && item.position != "18" && item.position != "19" && item.position != "20"
                || item.team.shortName == "Brighton Hove" && item.position != "1" && item.position != "2" && item.position != "3" && item.position != "4" && item.position != "5" && item.position != "6" && item.position != "7" && item.position != "8" && item.position != "18" && item.position != "19" && item.position != "20"
                || item.team.shortName == "Fulham" && item.position != "1" && item.position != "2" && item.position != "3" && item.position != "4" && item.position != "5" && item.position != "6" && item.position != "7" && item.position != "8" && item.position != "18" && item.position != "19" && item.position != "20"
                || item.team.shortName == "Wolverhampton" && item.position != "1" && item.position != "2" && item.position != "3" && item.position != "4" && item.position != "5" && item.position != "6" && item.position != "7" && item.position != "8" && item.position != "18" && item.position != "19" && item.position != "20"
            ) {
                return (
                    <View style={styles.listView}>
                        <Text style={styles.position}>{item.position}</Text>
                        <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                        <Text style={styles.name}>{item.team.shortName}</Text>
                        <Text style={styles.played}>{item.playedGames}</Text>
                        <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                        <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                        <Text style={styles.points}>{item.points}</Text>
                    </View>
                )
            } else if (item.position == "1" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"){
                return (
                    <View style={styles.topMargin}>
                        <View style={styles.topView}>
                            <Text style={styles.ChamionsText}>CHAMPIONS LEAGUE</Text>
                            <Text style={styles.topText}>Pts</Text>
                            <Text style={styles.topText1}>P</Text>
                            <Text style={styles.topText2}>Goals</Text>
                            <Text style={styles.topText3}>GD</Text>
                        </View>
                        <View style={styles.listViewTop}>
                            <Text style={styles.position}>{item.position}</Text>
                            <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.position == "1" && item.team.shortName == "Tottenham" 
                || item.team.shortName == "Brighton Hove" && item.position == "1"
                || item.team.shortName == "Fulham" && item.position == "1"
                || item.team.shortName == "Wolverhampton" && item.position == "1"
            ){
                return (
                    <View style={styles.topMargin}>
                        <View style={styles.topView}>
                            <Text style={styles.ChamionsText}>CHAMPIONS LEAGUE</Text>
                            <Text style={styles.topText}>Pts</Text>
                            <Text style={styles.topText1}>P</Text>
                            <Text style={styles.topText2}>Goals</Text>
                            <Text style={styles.topText3}>GD</Text>
                        </View>
                        <View style={styles.listViewTop}>
                            <Text style={styles.position}>{item.position}</Text>
                            <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.position == "2" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"  
                || item.position == "3" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton" 
                || item.position == "4" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"
            ){
                return (
                    <View>
                        <View style={styles.listViewTopChamp}>
                            <Text style={styles.position}>{item.position}</Text>
                            <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.position == "2" && item.team.shortName == "Tottenham"  || item.team.shortName == "Brighton Hove" && item.position == "2" || item.team.shortName == "Fulham" && item.position == "2" || item.team.shortName == "Wolverhampton" && item.position == "2"
                || item.position == "3" && item.team.shortName == "Tottenham"  || item.team.shortName == "Brighton Hove" && item.position == "3" || item.team.shortName == "Fulham" && item.position == "3" || item.team.shortName == "Wolverhampton" && item.position == "3"
                || item.position == "4" && item.team.shortName == "Tottenham"  || item.team.shortName == "Brighton Hove" && item.position == "4" || item.team.shortName == "Fulham" && item.position == "4" || item.team.shortName == "Wolverhampton" && item.position == "4"
            ){
                return (
                    <View>
                        <View style={styles.listViewTopChamp}>
                            <Text style={styles.position}>{item.position}</Text>
                            <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (item.position == "5" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"){
                return (
                    <View>
                        <View style={styles.topView}>
                            <Text style={styles.europaText}>EUROPA LEAGUE</Text>
                        </View>
                        <View style={styles.listViewPosition5}>
                            <Text style={styles.position}>{item.position}</Text>
                            <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.position == "6" && item.team.shortName == "Tottenham" 
                || item.team.shortName == "Brighton Hove" && item.position == "6" 
                || item.team.shortName == "Fulham" && item.position == "6"
                || item.team.shortName == "Wolverhampton" && item.position == "6"
            ){
                return (
                    <View>
                        <View style={styles.listViewPosition6}>
                            <Text style={styles.position}>{item.position}</Text>
                            <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (item.position == "6" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"){
                return (
                    <View>
                        <View style={styles.listViewPosition6}>
                            <Text style={styles.position}>{item.position}</Text>
                            <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.position == "5" && item.team.shortName == "Tottenham" 
                || item.team.shortName == "Brighton Hove" && item.position == "5" 
                || item.team.shortName == "Fulham" && item.position == "5"
                || item.team.shortName == "Wolverhampton" && item.position == "5"
            ){
                return (
                    <View>
                        <View style={styles.topView}>
                            <Text style={styles.europaText}>EUROPA LEAGUE</Text>
                        </View>
                        <View style={styles.listViewPosition5}>
                            <Text style={styles.position}>{item.position}</Text>
                            <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (item.position == "7" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"){
                return (
                    <View>
                        <View style={styles.topView}>
                            <Text style={styles.europaCText}>EUROPA CONFERENCE LEAGUE QUALIFICATION</Text>
                        </View>
                        <View style={styles.listViewPosition7}>
                            <Text style={styles.position}>{item.position}</Text>
                            <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.team.shortName == "Tottenham" && item.position == "7"
                || item.team.shortName == "Brighton Hove" && item.position == "7"
                || item.team.shortName == "Fulham" && item.position == "7"
                || item.team.shortName == "Wolverhampton" && item.position == "7"
            ){
                return (
                    <View>
                        <View style={styles.topView}>
                            <Text style={styles.europaCText}>EUROPA CONFERENCE LEAGUE QUALIFICATION</Text>
                        </View>
                        <View style={styles.listViewPosition7}>
                            <Text style={styles.position}>{item.position}</Text>
                            <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (item.position == "8" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"){
                return (
                    <View>
                        <View style={styles.listViewPosition8}>
                            <Text style={styles.position}>{item.position}</Text>
                            <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.team.shortName == "Tottenham" && item.position == "8"
                || item.team.shortName == "Brighton Hove" && item.position == "8"
                || item.team.shortName == "Fulham" && item.position == "8"
                || item.team.shortName == "Wolverhampton" && item.position == "8"
            ){
                return (
                    <View>
                        <View style={styles.listViewPosition8}>
                            <Text style={styles.position}>{item.position}</Text>
                            <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (item.position == "18" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"){
                return (
                    <View>
                        <View style={styles.topView}>
                            <Text style={styles.relegationText}>RELEGATION</Text>
                        </View>
                        <View style={styles.listViewPosition18}>
                            <Text style={styles.position}>{item.position}</Text>
                            <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.team.shortName == "Tottenham" && item.position == "18"
                || item.team.shortName == "Brighton Hove" && item.position == "18"
                || item.team.shortName == "Fulham" && item.position == "18"
                || item.team.shortName == "Wolverhampton" && item.position == "18"
            ){
                return (
                    <View>
                        <View style={styles.topView}>
                            <Text style={styles.relegationText}>RELEGATION</Text>
                        </View>
                        <View style={styles.listViewPosition18}>
                            <Text style={styles.position}>{item.position}</Text>
                            <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (item.position == "19" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"){
                return (
                    <View>
                        <View style={styles.listViewPosition19}>
                            <Text style={styles.position}>{item.position}</Text>
                            <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (
                item.team.shortName == "Tottenham" && item.position == "19"
                || item.team.shortName == "Brighton Hove" && item.position == "19"
                || item.team.shortName == "Fulham" && item.position == "19"
                || item.team.shortName == "Wolverhampton" && item.position == "19"
            ){
                return (
                    <View>
                        <View style={styles.listViewPosition19}>
                            <Text style={styles.position}>{item.position}</Text>
                            <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                            <Text style={styles.name}>{item.team.shortName}</Text>
                            <Text style={styles.played}>{item.playedGames}</Text>
                            <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                            <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                            <Text style={styles.points}>{item.points}</Text>
                        </View>
                    </View>
                )
            } else if (item.position == "20" && item.team.shortName != "Tottenham"  && item.team.shortName != "Brighton Hove" && item.team.shortName != "Fulham" && item.team.shortName != "Wolverhampton"){
                return (
                    <View style={styles.listViewBottom}>
                        <Text style={styles.position}>{item.position}</Text>
                        <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                        <Text style={styles.name}>{item.team.shortName}</Text>
                        <Text style={styles.played}>{item.playedGames}</Text>
                        <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                        <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                        <Text style={styles.points}>{item.points}</Text>
                    </View>
                )
            } else if (
                item.team.shortName == "Tottenham" && item.position == "20"
                || item.team.shortName == "Brighton Hove" && item.position == "20"
                || item.team.shortName == "Fulham" && item.position == "20"
                || item.team.shortName == "Wolverhampton" && item.position == "20"
            ){
                return (
                    <View style={styles.listViewBottom}>
                        <Text style={styles.position}>{item.position}</Text>
                        <SvgUri style={styles.logo} width="25" height="25" uri={item.team.crest} />
                        <Text style={styles.name}>{item.team.shortName}</Text>
                        <Text style={styles.played}>{item.playedGames}</Text>
                        <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                        <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                        <Text style={styles.points}>{item.points}</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.listView}>
                        <Text style={styles.position}>{item.position}</Text>
                        <Image style={styles.logo} source={{uri: item.team.crest}}></Image>
                        <Text style={styles.name}>{item.team.shortName}</Text>
                        <Text style={styles.played}>{item.playedGames}</Text>
                        <Text style={styles.goalsFor}>{item.goalsFor}</Text><Text style={styles.goalsSplit}>:</Text><Text style={styles.goalsAgainst}>{item.goalsAgainst}</Text>
                        <Text style={styles.goalDifference}>{item.goalDifference}</Text>
                        <Text style={styles.points}>{item.points}</Text>
                    </View>
                )
            }
        }}
      />
    </View>
  )
}

export default TableScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    premLogo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: -15
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
        marginBottom: 10,
    },
    topMargin: {
        marginTop: 10,
    },
    flatlist: {
        marginBottom: 230,
        width: "100%",
        alignSelf: "center",
        backgroundColor: "white",
    },
    listView: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        alignSelf: "center",
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    listViewBottom: {
        flexDirection: "row",
        backgroundColor: "#FFCCCB",
        width: "100%",
        alignSelf: "center",
        marginBottom: 10,
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5 
    },
    imageBackground: {
        height: "100%",
        width: "100%"
    },
    listViewTop: {
        flexDirection: "row",
        backgroundColor: "lightgreen",
        width: "100%",
        alignSelf: "center",
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    listViewTopChamp: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "white",
        height: "auto",
        alignSelf: "center",
        alignContent: "center",
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    listViewPosition5: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        alignSelf: "center",
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    listViewPosition6: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        alignSelf: "center",
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    listViewPosition7: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        alignSelf: "center",
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    listViewPosition8: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        alignSelf: "center",
        marginTop: 5,
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    listViewPosition18: {
        flexDirection: "row",
        backgroundColor: "#FFCCCB",
        width: "100%",
        alignSelf: "center",
        marginTop: 1,
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    listViewPosition19: {
        flexDirection: "row",
        backgroundColor: "#FFCCCB",
        width: "100%",
        alignSelf: "center",
        // shadowColor: "black",
        // shadowOffset: {
        // width: 0,
        // height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        // elevation: 5
    },
    name: {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 10,
        color: "grey",
        textAlign: "left",
        left: 60
    },
    logo: {
        width: 25,
        height: 25,
        position: "absolute",
        alignSelf: "center",
        left: 40,
    },
    played: {
        marginRight: 12,
        marginTop: 10,
        marginBottom: 10,
        color: "grey",
        position: "absolute",
        right: 135,
    },
    goalsFor: {
        marginRight: 12,
        marginTop: 10,
        marginBottom: 10,
        color: "grey",
        position: "absolute",
        right: 96,
    },
    goalsSplit: {
        marginRight: 12,
        marginTop: 10,
        marginBottom: 10,
        color: "grey",
        position: "absolute",
        right: 92,
    },
    goalsAgainst: {
        marginRight: 12,
        marginTop: 10,
        marginBottom: 10,
        color: "grey",
        position: "absolute",
        right: 78,
    },
    goalDifference: {
        marginRight: 12,
        marginTop: 10,
        marginBottom: 10,
        color: "grey",
        position: "absolute",
        right: 40,
    },
    points: {
        marginRight: 12,
        marginTop: 10,
        marginBottom: 10,
        color: "black",
        position: "absolute",
        right: 0,
        fontWeight: "bold"
    },
    position: {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 10,
        color: "black",
        position: "absolute",
        left: 0,
        fontWeight: "bold"
    },
    topText: {
        marginHorizontal: 10,
        color: "grey",
        position: "absolute",
        right: 0,
        fontSize: 15,
        fontWeight: "bold",
    },
    topText1: {
        marginHorizontal: 10,
        color: "grey",
        position: "absolute",
        right: 140,
        fontSize: 15,
        fontWeight: "bold",
    },
    topText2: {
        marginHorizontal: 10,
        color: "grey",
        position: "absolute",
        right: 80,
        fontSize: 15,
        fontWeight: "bold",
    },
    topText3: {
        marginHorizontal: 10,
        color: "grey",
        position: "absolute",
        right: 40,
        fontSize: 15,
        fontWeight: "bold",
    },
    topView: {
        width: "100%",
        alignSelf: "center",
        height: "auto",
        marginBottom: 25,
    },
    ChamionsText: {
        color: "lightgrey",
        position: "absolute",
        left: 5,
        fontSize: 15,
        fontWeight: "bold",
    },
    europaText: {
        marginTop: 5,
        color: "lightgrey",
        position: "absolute",
        left: 5,
        fontSize: 15,
        fontWeight: "bold"
    },
    europaCText: {
        marginTop: 5,
        color: "lightgrey",
        position: "absolute",
        left: 5,
        fontSize: 15,
        fontWeight: "bold"
    },  
    relegationText: {
        marginTop: 5,
        color: "lightgrey",
        position: "absolute",
        left: 5,
        fontSize: 15,
        fontWeight: "bold"
    }, 
})