import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import TextBase from '../ui/TextBase';
import {Colors, Fonts} from '../../styles/Style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {MatomoTrackEvent} from '../../utils/Matomo';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  userInfos: Record<string, string> | undefined;
}

const DisplayHelpAround = (props: Props) => {
  const [helpAround, setHelpAround] = React.useState<any>();
  const [responses, setResponses] = React.useState<any>();
  const {userInfos} = props;
  const navigation = useNavigation();

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setHelpAround(JSON.parse(content)['help-around']);
          setResponses(JSON.parse(content).response.results);
        }
      });
    };
    getContentFromCache();
  }, []);

  const handlePress = (el: any) => {
    MatomoTrackEvent('FOLLOWUP', 'FOLLOWUP_HELPAROUND_CLICK', el.title ?? '');
    navigation.navigate('HelpAround', {help: el});
  };

  const displayInfos = () => {
    if (userInfos) {
      console.log(helpAround);
      const userHelpAround = responses.find(
        (el: any) => el.value === userInfos.housing,
      );
      if (userHelpAround.helpsAround) {
        return userHelpAround.helpsAround.map((el: any) => {
          return (
            <Pressable
              key={el.title}
              onPress={() => {
                handlePress(el);
              }}
              style={({pressed}) => [
                styles.pressable,
                {opacity: pressed ? 0.5 : 1},
              ]}>
              <TextBase style={styles.icon}>{el.icon}</TextBase>
              <TextBase style={styles.text}>{el.title}</TextBase>
              <FontAwesome5Icon
                name="chevron-right"
                color={Colors.black}
                style={styles.check}
              />
            </Pressable>
          );
        });
      }
    } else {
      return <TextBase>{helpAround?.noInfo}</TextBase>;
    }
  };

  return (
    <View style={styles.container}>
      <TextBase style={styles.title}>{helpAround?.title}</TextBase>
      {displayInfos()}
    </View>
  );
};

export default DisplayHelpAround;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.primary,
    marginBottom: 10,
  },
  pressable: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 3,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    fontSize: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.primary,
  },
  check: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
});
