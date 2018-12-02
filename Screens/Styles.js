import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    padding: 10,
      justifyContent: 'center',
      },
      padding: {
        paddingTop: 23
     },
     input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        width: 350,
        alignSelf: 'center'   
     },
     Button: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        width: 200,
        alignSelf: 'center'
     },
     ButtonText:{
        color: 'white',
        textAlign: 'center',
     },
     bottomText:{
      textAlign: 'center'
     },

     radius: {
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,112,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
     },
     marker: {
      height: 20,
      width: 20,
      borderRadius: 20/2,
      overflow: 'hidden',
      backgroundColor: '#007AFF',
      borderWidth: 3,
      borderColor: 'white',
     
      
     }
})