import React from 'react';
import Container from '../components/ui/Container';
import DoctorShare from '../components/situation/DoctorShare';
import PregnancyFollow from '../components/situation/PregnancyFollow';
import MonthlyMeetings from '../components/situation/MonthlyMeetings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import SituationSymptoms from '../components/situation/SituationSymptoms';
import UserProfile from '../components/situation/UserProfile';
import {ScrollView} from 'react-native';

interface Symptome {
  label: string;
  slug: string;
  status: string;
  code: string;
}

const MySituation = () => {
  const isFocused = useIsFocused();
  const [userSymptomes, setUserSymptomes] = React.useState<Symptome[]>([]);

  const retrieveUserSymptomes = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userSymptomesStatus');
      if (value !== null) {
        setUserSymptomes(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    retrieveUserSymptomes();
  }, [retrieveUserSymptomes, isFocused]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DoctorShare />
        <PregnancyFollow />
        <MonthlyMeetings />
        <SituationSymptoms symptomes={userSymptomes} />
        <UserProfile />
      </ScrollView>
    </Container>
  );
};

export default MySituation;
