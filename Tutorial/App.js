import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import ImageMarker from "react-native-image-marker";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 10px solid black;
  background-color: pink;
`;

const Text = styled.Text`
  font-size: 20px;
  color: white;
  left: 10%;
  top: 80%;
`;

const Touchable = styled.TouchableOpacity``;

const App = () => {
  const [date, setDate] = useState(new Date().toLocaleString('ko-KR'));
  const cameraRef = React.useRef(null); // useRef로 camera를 위한 ref를 하나 만들어주고
  
  useEffect(()=>{
    const time = setInterval(()=> {
      setDate(new Date().toLocaleString('ko-KR'));
    }, 10);
  });
  const takePhoto = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      
      if (data) {
        const uri = await ImageMarker.markText({
          src : data.uri,
          text: date + '\n' +'일단 나가 🏃🏻‍♀️',
          X: 100,
          Y: 300,
          color: '#FFFFFF',
          fontSize: 120,
          scale: 1,
          quality: 100
        });
        const result = await CameraRoll.save(uri, {type:'photo'});
        console.log(result);
      }
    }
  };

  return (
    <>
      <RNCamera
        ref={cameraRef}
        style={{
          width: 400,
          height: 400,
        }}
        captureAudio={false} >
        <Text>{date}</Text>
        <Text>일단 나가 🏃🏻‍♀️</Text>
        </RNCamera>
      <View>
        <Touchable onPress={takePhoto}>
          <Button />
        </Touchable>
      </View>
    </>
  )
}

export default App;