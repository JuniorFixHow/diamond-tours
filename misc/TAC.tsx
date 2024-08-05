import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, ScrollView, Text, View, Modal, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type TACProps = {
    showTerms:boolean,
    setShowTerms: Dispatch<SetStateAction<boolean>>
}

const TermsAndConditions = ({showTerms, setShowTerms}:TACProps) => {
  return (
    <Modal  
        visible={showTerms}
        onRequestClose={()=>setShowTerms(false)}
        transparent
        // style={styles.mainmodal}
    >
            <ScrollView contentContainerStyle={styles.mainmodal} style={{width:'100%'}} >
        {/* <Pressable style={styles.mainmodal} > */}
                <View style={{width:'100%', }} >

                    <View style={styles.container} >
                        <TouchableOpacity onPress={()=>setShowTerms(false)} style={{position:'absolute', right:10, top:10}} >
                            <AntDesign name="closecircleo"  size={24} color="crimson" />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Diamond Tours Ghana</Text>
                        <Text style={styles.subheading}>Terms and Conditions</Text>

                        <Text style={styles.paragraph}>
                            Welcome to the Diamond Tours Ghana app! By downloading, accessing, or using our app, you agree to be bound by these terms and conditions and our privacy policy.
                        </Text>

                        <Text style={styles.sectionTitle}>1. Services Provided</Text>
                        <Text style={styles.paragraph}>
                            The Diamond Tours Ghana app provides the following services:
                        </Text>
                        <View style={styles.list}>
                            <Text style={styles.listItem}>- Flight booking</Text>
                            <Text style={styles.listItem}>- Hotel reservation</Text>
                            <Text style={styles.listItem}>- Tourism packages and activities</Text>
                        </View>
                        <Text style={styles.sectionTitle}>2. Pricing and Payments</Text>
                        <Text style={styles.paragraph}>
                            All prices displayed in the app are in Ghanaian Cedi (GHS) and include any applicable taxes and fees. Payment can be made via credit/debit card or mobile money. All payments are processed securely.
                        </Text>

                        <Text style={styles.sectionTitle}>3. Booking and Reservation</Text>
                        <Text style={styles.paragraph}>
                            Users can search, select, and book flights, hotels, and tourism packages through the app. All bookings are subject to availability and the policies of the respective airline, hotel, or tour operator.
                        </Text>

                        <Text style={styles.sectionTitle}>4. Cancellations and Refunds</Text>
                        <Text style={styles.paragraph}>
                            Cancellation and refund policies vary by service provider. Users should review the specific policies before completing a booking. Diamond Tours Ghana will assist with processing cancellations and refunds per the provider's terms.
                        </Text>
                        <Text style={styles.sectionTitle}>5. User Accounts</Text>
                        <Text style={styles.paragraph}>
                            Users must create an account to use the full functionality of the app. Account information must be accurate and kept up to date. Users are responsible for maintaining the confidentiality of their account credentials.
                        </Text>

                        <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
                        <Text style={styles.paragraph}>
                            The Diamond Tours Ghana app and all of its content are the property of Diamond Tours Ghana and are protected by copyright, trademark, and other intellectual property laws.
                        </Text>

                        <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
                        <Text style={styles.paragraph}>
                            Diamond Tours Ghana is not liable for any issues, damages, or losses arising from the use of the app or the services provided. Users utilize the app at their own risk.
                        </Text>

                        <Text style={styles.sectionTitle}>8. Governing Law</Text>
                        <Text style={styles.paragraph}>
                            These terms and conditions are governed by the laws of Ghana. Any disputes will be resolved in Ghanaian courts.
                        </Text>
                        <Text style={styles.sectionTitle}>9. Modifications</Text>
                        <Text style={styles.paragraph}>
                            Diamond Tours Ghana reserves the right to modify these terms and conditions at any time. Users should review the terms periodically for any changes.
                        </Text>

                        <Text style={styles.paragraph}>
                            By continuing to use the Diamond Tours Ghana app, you acknowledge that you have read, understand, and agree to these terms and conditions.
                        </Text>
                    </View>
                </View>



        {/* </Pressable> */}
            </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // height:'90%',
    backgroundColor: '#fff',
    padding: 20,
    width:'95%',
    alignSelf:'center',
    borderRadius:20,
    position:'relative'
    // paddingBottom:200,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  mainmodal:{
    position:'absolute',
    width:'100%',
    flex:1,
    zIndex:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#000000aa',
    paddingVertical:30,
},
});

export default TermsAndConditions;