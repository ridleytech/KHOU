import {useMemo} from 'react';
import React, {View, Text, StyleSheet, Switch} from 'react-native';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';

function SettingsItem() {
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);
  const dispatch = useDispatch();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.settingsItem}>
      <Text style={styles.settingsLabel}>Dark mode</Text>
      <View style={styles.switch}>
        <Switch
          style={{marginRight: 12}}
          trackColor={{
            false: 'white',
            true: theme === 'light' ? '#ADB5BD' : 'white',
          }}
          thumbColor={theme === 'light' ? 'white' : '#1360aa'}
          ios_backgroundColor="#ADB5BD"
          onValueChange={() => {
            dispatch({
              type: 'CHANGE_UI',
              theme: theme === 'light' ? 'dark' : 'light',
            });
          }}
          value={theme === 'light' ? false : true}
        />
        <Text style={styles.modeSetting}>
          {theme === 'dark' ? 'On' : 'Off'}
        </Text>
      </View>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    settingsItem: {
      marginTop: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 30,
    },
    settingsLabel: {
      fontSize: 20,
      flex: 1,
      fontWeight: '400',
      color: theme === 'light' ? '#495057' : 'white',
    },
    switch: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    modeSetting: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '400',
      color: theme === 'light' ? 'black' : 'white',
    },
  });

export default SettingsItem;
