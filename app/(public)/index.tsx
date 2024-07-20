import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import SlidePage from "../../components/SlidePage"; 
import { useAuth } from "@clerk/clerk-expo";
import { NewContext } from "../../context/NewContext";
import { useRouter } from "expo-router";

const welcome = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {isNew} = useContext(NewContext)
  const {isLoaded} = useAuth();
  const router = useRouter();
  // console.log(isLoaded);
  // if(!isLoaded) return;
  if(!isNew) return null;
  
  return (
    <>
    {
      pageNumber === 1 ?
      <SlidePage
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
        title="Plan Your Trip"
        text="Save places and book your awesome trips with Diamond Tours Ghana"
        isLast={false}
        />
        :
      pageNumber === 2 ?
      <SlidePage
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
        title="Begin The Adventure"
        text="Start Diamond Tours with your family and friends."
        isLast={false}
        />
        :
    
      <SlidePage
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
        title="Enjoy Your Trip"
        text="Enjoy your trip with Diamond Tours and stay relax"
        isLast={true}
        />
      }
      </>
  );
};

export default welcome;

const styles = StyleSheet.create({});
