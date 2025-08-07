import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Rules = (): React.JSX.Element => {
return (
    <View style={styles.screen}>
        <Text style={styles.title}>
            Rules of Grand Hand Slam
        </Text>
        <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.txt}>
                1. You will from now on, only drink with your non-dominant hand. {'\n'}{'\n'}
                2. If you are called out for drinking with your dominant hand(DH) by anyone playing the game, that is a Grand Hand Slam(GHS), you chug, the remainder of your drink. {'\n'}{'\n'}
                3. A GHS means you have to chug the remainder of your drink, regarldess of type, amount, time or place to completion. {'\n'}{'\n'}
                4. At purchase or upon receival, you are allowed transportation of said drink to which ever location you decided to sit/stand/laydown with your
                DH. After relocation, game is back on and you will be vulnerable to a GHS. Even if you're just holding you're drink. {'\n'}{'\n'}
                5. This means any drink, bottle, can, pint, ect. or other drinking receptable. (Be aware, holding a straw after receiving a drink and relocating, will be considered a GHS.) {'\n'}{'\n'}
                6. Touching a straw with your DH after relocation will be vulnerble to a GHS. {'\n'}{'\n'}
                7. If you cannot chug said drink, you are allowed ONE mulligan per month, absolving you of your responsibitly to chug said drink. {'\n'}{'\n'}
                8. The mulligan does NOT carry over to the next month and will only absolve you of that person's call to GHS you and if you are caught again, you MUST chug. {'\n'}{'\n'}
                9. It must be your OWN DRINK. Someone cannot call a GHS if you're holding someone else's drink. {'\n'}{'\n'}
                10. Be a gentleman/gentlewoman, use discretion when calling a GHS. If a player is clearly way too drunk to continue, don't be an asshole.
                </Text>
        </ScrollView>
    </View>
);
}

export default Rules;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#00308F',
        alignItems: 'center',
        height: '99.9%'
    },
    title: {
        color: 'white',
        marginBottom: 50,
        fontSize: 30,
    },
    scroll: {
        alignItems: 'center',
    },
    txt: {
        color: 'white',
        fontSize: 19,
    }
});

