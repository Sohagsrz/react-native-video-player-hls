/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import AndroidPip from 'react-native-android-pip';

import {
  AppState,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Video, { FilterType } from 'react-native-video';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
 
const App = ()  =>  { 
  const [track, settrack] = React.useState({
    type: '',
    value: '',
    index:0
  });
 const [isPip, setisPip] = useState(false);

 React.useEffect(() => {
  AppState.addEventListener('change', (nextAppState) => {
    console .log('AppState change; Next app state: ', nextAppState);
    if(nextAppState =='background' && isPip){
      setisPip(true);
    }
    if(nextAppState =='active' && isPip){
      setisPip(false);
    }
  });
  
 
   return () => {
      
   }
 }, [])
 

  return (<>
  <View>  
    <Video controls={true}
       source={{
        uri: "http://103.179.44.107/astrotv/video.m3u8",
        // type: 'mpd'
      }}    

      ignoreSilentSwitch="ignore"
      repeat={true}
      onLoad={(data) =>{
        console.log(data);
        // settrack(data.)
      }}
      // selectedAudioTrack={ track }

      fullscreenAutorotate={true}
      pictureInPicture={isPip}
      playInBackground={true}
      // playWhenInactive={true}
      // reportBandwidth={true}
      fullscreenOrientation="all"
      // filter={FilterType.MONO }
      audioOnly={false}
      resizeMode='contain'
       onBuffer={(dd)=>{
        console.log(dd);
        console.log('buffering')
       }} // Callback when remote video is buffering
       onError={(e) =>{
         
        console.log(e);
        console.log('error')
       }} // Callback when video cannot be loaded
       style={{
         

        height:isPip ? 106 : 200,
        width:isPip ? 190 : Dimensions.get('screen').width,
        backgroundColor:'red'
       }} />

       {!isPip && (<><View style={{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
       }}>
        <TouchableOpacity style={{
          backgroundColor:"blue",
          padding:10,
          width:'80%',
          alignContent:'center',
          alignItems:'center',
          marginTop:15,
          borderRadius:5
          
        }} onPress={() =>{ 
          AndroidPip.enterPictureInPictureMode();
          setisPip(true)
        }}>
          <Text>PIP Mode</Text>
        </TouchableOpacity>

        <Text>
          Testing for anondo Tv , Android app
        </Text>
       </View>
       </>)}
       
  </View>
  </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
