import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { MyStyles } from "../utils/Styles";
import Slide1 from "../assets/imgs/Frame387.png";
import Slide2 from "../assets/imgs/Frame388.png";
import Slide3 from "../assets/imgs/pana.png";
import { useRouter } from "expo-router";
import { NewContext } from "../context/NewContext";

type SlideProps = {
  pageNumber: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  isLast: boolean,
  title: string,
  text: string,
};

const SlidePage = ({pageNumber, isLast, title, text, setPageNumber}:SlideProps) => {
  const {setIsNew} = useContext(NewContext);
    const router = useRouter();
    const handlePress =()=>{
        if(pageNumber === 1){
            setPageNumber(2);
        }
        else if(pageNumber === 2){
            setPageNumber(3)
        }
        else{
          setIsNew(false);  
          router.replace('/(public)/(auth)');
        }
    }
  return (
    <View style={MyStyles.main}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
          height:'100%'
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 20,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={pageNumber === 1? Slide1 : pageNumber=== 2? Slide2 : Slide3}
            style={{ width: 250, height: 250, objectFit: "contain" }}
          />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              flexDirection: "row",
            }}
          >
            <View style={pageNumber === 1? styles.dot2 : styles.dot} />
            <View style={pageNumber === 2? styles.dot2 : styles.dot} />
            <View style={pageNumber === 3? styles.dot2 : styles.dot} />
          </View>
          <Text style={MyStyles.welcomeText}>{title}</Text>
          <Text style={MyStyles.welcomeMessage}>
            {text}
          </Text>
        </View>
        <TouchableOpacity
        onPress={handlePress}
          style={{
            width: "80%",
            backgroundColor: "#cb4900",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            {isLast?'Get Started':'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SlidePage;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "#D3B8A8",
    height: 5,
    width: 5,
    borderRadius: 8,
  },
  dot2: {
    backgroundColor: "#cb4900",
    height: 5,
    width: 15,
    borderRadius: 2,
  },
});
