import { StyleSheet } from 'react-native'

import colors from '../../global_styles'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        marginTop: 80,
        fontFamily: 'Poppins-Regular'
    },
    titleBold: {
        fontFamily: 'Poppins-Bold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
    },
    button: {
        width: '100%',
        height: 120,
        backgroundColor: colors.four,
        borderRadius: 20,
        padding: 24,
        justifyContent: 'space-between',
    },
    buttonText: {
        fontFamily: 'Archivo-Bold',
        color: '#fff',
        fontSize: 20,
    },
})

export default styles