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
    itens: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    label: {
        fontFamily: 'Poppins-Regular',
        color: '#fff',
    },

})

export default styles