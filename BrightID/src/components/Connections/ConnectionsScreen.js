// @flow

import React, { useCallback, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import fetchUserInfo from '@/actions/fetchUserInfo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FloatingActionButton from '@/components/Helpers/FloatingActionButton';
import EmptyList from '@/components/Helpers/EmptyList';
import { ORANGE } from '@/utils/constants';
import { toSearchString } from '@/utils/strings';
import { DEVICE_LARGE } from '@/utils/deviceConstants';
import ConnectionCard from './ConnectionCard';
import { defaultSort } from './models/sortingUtility';

/**
 * Connection screen of BrightID
 * Displays a search input and list of Connection Cards
 */

/** Helper Component */

const ICON_SIZE = 26;

const ITEM_HEIGHT = DEVICE_LARGE ? 102 : 92;

const getItemLayout = (data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

const renderItem = ({ item, index }) => {
  item.index = index;
  return <ConnectionCard {...item} />;
};

/** Selectors */

const searchParamSelector = (state) => state.connections.searchParam;
const connectionsSelector = (state) => state.connections.connections;

const filterConnectionsSelector = createSelector(
  connectionsSelector,
  searchParamSelector,
  (connections, searchParam) => {
    const searchString = toSearchString(searchParam);
    return connections.filter((item) =>
      toSearchString(`${item.name}`).includes(searchString),
    );
  },
);

/** Main Component */

export const ConnectionsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const connections = useSelector((state) => filterConnectionsSelector(state));

  useFocusEffect(
    useCallback(() => {
      dispatch(defaultSort());
      dispatch(fetchUserInfo());
    }, [dispatch]),
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await dispatch(fetchUserInfo());
      dispatch(defaultSort());
      setRefreshing(false);
    } catch (err) {
      console.log(err.message);
      setRefreshing(false);
    }
  };

  const handleNewConnection = () => {
    navigation.navigate('MyCode');
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={ORANGE}
        animated={true}
      />
      <View style={styles.orangeTop} />

      <View style={styles.container} testID="connectionsScreen">
        <View style={styles.mainContainer}>
          <FlatList
            style={styles.connectionsContainer}
            data={connections}
            keyExtractor={({ id }, index) => id + index}
            renderItem={renderItem}
            // getItemLayout={getItemLayout}
            contentContainerStyle={{
              paddingBottom: 70,
              paddingTop: 20,
              flexGrow: 1,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListEmptyComponent={
              <EmptyList
                iconType="account-off-outline"
                title="No connections"
              />
            }
          />
        </View>

        <FloatingActionButton onPress={handleNewConnection} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  orangeTop: {
    backgroundColor: ORANGE,
    height: DEVICE_LARGE ? 70 : 65,
    width: '100%',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 58,
    marginTop: -58,
    overflow: 'hidden',
    zIndex: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  connectionsContainer: {
    flex: 1,
    width: '100%',
  },
  actionCard: {
    height: DEVICE_LARGE ? 76 : 71,
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_LARGE ? 60 : 55,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 11,
  },
});

export default ConnectionsScreen;
