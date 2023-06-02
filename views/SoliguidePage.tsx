import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import TextBase from '../components/ui/TextBase';
import {Colors, Fonts} from '../styles/Style';
import BackButton from '../components/ui/BackButton';
import RenderHtml from 'react-native-render-html';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useTranslation} from 'react-i18next';

interface Props {
  route: any;
}

const SoliguidePage = (props: Props) => {
  const {structure} = props.route.params;
  const {t} = useTranslation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton />
        <TextBase style={styles.title}>{structure.name}</TextBase>
        <RenderHtml
          tagsStyles={tagStyles}
          contentWidth={useWindowDimensions().width}
          source={{html: structure.description}}
        />
      </View>
      <View style={styles.containerMap}>
        {Platform.OS === 'ios' ? (
          <MapView
            style={styles.map}
            region={{
              latitude: structure.position.location.coordinates[1],
              longitude: structure.position.location.coordinates[0],
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <Marker
              coordinate={{
                latitude: structure.position.location.coordinates[1],
                longitude: structure.position.location.coordinates[0],
              }}
            />
          </MapView>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: structure.position.location.coordinates[1],
              longitude: structure.position.location.coordinates[0],
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <Marker
              coordinate={{
                latitude: structure.position.location.coordinates[1],
                longitude: structure.position.location.coordinates[0],
              }}
            />
          </MapView>
        )}
      </View>
      <View style={styles.container}>
        <TextBase style={styles.title}>Services proposés</TextBase>
        {structure.services_all.map(service => (
          <View style={styles.description}>
            <TextBase style={styles.category}>
              {t(`soliguide.categories.${service.categorie}`)}
            </TextBase>
            {service.description ? (
              <RenderHtml
                tagsStyles={tagStyles}
                source={{html: service.description}}
              />
            ) : (
              <TextBase style={styles.tagStyles}>
                {t('soliguide.direct_access')}
              </TextBase>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SoliguidePage;

const tagStyles = {
  p: {
    fontSize: 16,
    marginBottom: 0,
    fontFamily: Fonts.primary,
    color: '#000000',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundUrgence,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: Fonts.primary,
    color: '#000000',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
    fontFamily: Fonts.primary,
  },
  tagStyles: {
    fontSize: 16,
    fontFamily: Fonts.primary,
    color: '#000000',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: Fonts.primary,
    backgroundColor: '#ffffff',
    color: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  containerMap: {
    height: 300,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 20,
  },
});
