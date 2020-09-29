import { StyleSheet } from 'react-native'

import colors from '../../global_styles'

const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'center',
       padding: 40,
       backgroundColor: colors.three,
    },
    banner: {
       width: '100%',
       resizeMode: 'contain',
       marginBottom: 40,
       marginTop: 40,
    },
    title: {
       color: '#fff',
       fontSize: 20,
       lineHeight: 30,
       fontFamily: 'Poppins-Regular',
       alignSelf: 'flex-start'
    },
    titleBold: {
       fontFamily: 'Poppins-Bold',
    },
    inputContainer: {
       marginTop: 30,
    },
    label: {
       fontFamily: 'Poppins-Regular',
       color: '#fff'
    },
    inputGroup: {
       flexDirection: 'row',
       justifyContent: 'space-between',
    },
    inputBlock: {
       width: '48%',
    },
    input: {
       height: 54,
       backgroundColor: '#fff',
       borderRadius: 8,
       justifyContent: 'center',
       paddingHorizontal: 16,
       marginTop: 4,
       marginBottom: 16,
       color: colors.two
    },
    submitButton: {
       backgroundColor: colors.five,
       flexDirection: 'row',
       height: 56,
       borderRadius: 8,
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 16
    },
    submitButtonText: {
       fontFamily: 'Archivo-Bold',
       color: '#fff',
       fontSize: 16,
    },
 })

export default styles