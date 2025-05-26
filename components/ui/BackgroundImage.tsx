import { Image, StyleSheet, Text, View } from "react-native"


export default function BackgroundImage() {
    
    return (
        <View style={styles.container}>
        
        <Image style={styles.image} source={require("@/assets/images/greenladyy.gif")} />
        { Image &&<Text style={styles.text}>Rest and recharge your batteries!</Text>}
        </View>
        
    )

}


const styles = StyleSheet.create({
    container: {
        flex:3/4,
        justifyContent:"center",
        alignItems:"center",

    },image:{
        width:280,
        height:280,
         shadowColor: "#009075",
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 1,
    shadowRadius: 40,
       
    
    },text:{
        color:'#e5e5e5',
        fontSize:12
    }
})