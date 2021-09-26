import  React,{useState,useEffect} from 'react';
import { StatusBar,Text, View, StyleSheet , Button,Image, TextInput,Dimensions,SafeAreaView,TouchableOpacity,ImageBackground,Alert} from 'react-native';
import Constants from 'expo-constants';

import {MaterialIcons} from '@expo/vector-icons'

const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=california&units=metric&appid=e059ad014bac773db26b5c128634c23b"

export default function App() {

  const [state,setState] = useState({
    isLoaded:false,
    name:'',
    temp:'',
    status:'',
    desc:'',
    icon:'',
  });

  const [input,setInput] = useState('california');

  const changeInput = (data) => {
    setInput(data);
    
  }

  useEffect(()=> {
        getWeatherDataV2();

    },[])


  const getWeatherData = () => {
    return(

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=e059ad014bac773db26b5c128634c23b`)
      .then(data => data.json())
      .then(results => setState({
        name:results.name,
        temp:results.main.temp,
        status:results.weather[0].main,
        desc:results.weather[0].description,
        icon:results.weather[0].icon,

        isLoaded:true,
      }))
      .catch(
        err => console.log(err)
      )


    );

  }


  const getWeatherDataV2 = () => {
    
      if(input == 'california') {
        return(
           //fetch internetten url ile veri çekmek için kullanılır
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=california&units=metric&appid=e059ad014bac773db26b5c128634c23b`)
      .then(data => data.json())
      .then(results => setState({
        name:results.name,
        temp:results.main.temp,
        status:results.weather[0].main,
        desc:results.weather[0].description,
        icon:results.weather[0].icon,

        isLoaded:true,
      }))
      .catch(err => console.log(err))
        );
      }
      else {
        return(
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=e059ad014bac773db26b5c128634c23b`)
      .then(data => data.json())
      .then(results => setState({
        name:results.name,
        temp:results.main.temp,
        status:results.weather[0].main,
        desc:results.weather[0].description,
        icon:results.weather[0].icon,

        isLoaded:true,
      }))
      .catch(err => console.log(err))
        );
      }
     

    

  }


  
   if(state.isLoaded){
     
     return(

      <SafeAreaView style={styles.container} >
      <StatusBar barStyle='dark-content' />
      <ImageBackground
      source={require('./assets/bc.jpg')} resizeMode="cover"
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('window').height,
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        opacity:.8
      }}
      >
     <View style={{justifyContent:'center',alignItems:'center'}}>
     
      <Image 
      style={{
        width:120,
        height:120,
        
      }}
      source={{uri:"https://openweathermap.org/img/w/"+state.icon+".png"}}
      />
      <Text style={styles.name} >{state.name}</Text>
      <Text style={styles.status} >{state.status}</Text>
      <Text style={styles.paragraph} >{state.desc}</Text>
      <Text style={styles.temp} >{state.temp}℃</Text>

       <TextInput 
       data={input}
       style={styles.input}
       placeholder='Enter the state/city name ex: California'
       onChangeText={(input) => changeInput(input)}
       />
         <TouchableOpacity
            onPress={
              () => getWeatherData()
            }
            
            >
              <View 
              style={styles.customButton}
              >
                <MaterialIcons name="check-circle" size={40} color="black" 
                style={{marginRight:5}}
                />

                <Text
                
                >Save</Text>
              </View>
            </TouchableOpacity>
      </View>

      
       
      </ImageBackground>
      </SafeAreaView>
     );
      }
      
      else {
        return(

      <SafeAreaView style={{justifyContent:'center',alignItems:'center'}}>
      <Text style={{
        justifyContent:'center',alignItems:'center',
        margin: 8,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    textShadowColor: 'white',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5
      }} >LOADING....</Text>
      
      </SafeAreaView>
        )
      }


    

    
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 8,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    textShadowColor: 'white',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 2
  },
  name:{
    margin: 8,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#ffca28',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5
  },
  status:{
    margin: 8,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#90caf9',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5
  },
  temp:{
    margin: 8,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#ffee58',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5
  },
  input: {
      borderBottomWidth: 2,
      borderBottomColor: 'black',
      fontSize: 15,
      width: Dimensions.get('screen').width * 0.8,
      height:'7%',
      color: 'black',
      fontWeight:'bold',
      textAlign:'center'
    },

    customButton:{
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#ffeb3b', 
      borderRadius:20,
      padding:10,
      marginRight:20,
      marginLeft:20,
      marginTop:20,
      flexDirection:'row',
      width: Dimensions.get('screen').width * 0.5,
      shadowColor:'#000000',
      shadowOpacity:0.2,
      shadowRadius:8,
      shadowOffset:{
        width:2,
        height:2
    }},
});
