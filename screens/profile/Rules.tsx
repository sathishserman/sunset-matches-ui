import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { confirmRules } from '../../redux/actions'; 
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { RuleProps } from '../../redux/interfaces';

export default function Rules({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      dispatch(confirmRules());
      navigation.navigate('Gender');
    },
  });

  const Rule = ({ text }: { text: string }) => (
    <View style={styles.rule}>
      <Text style={styles.ruleText}>{text}</Text>
      <View style={styles.dot} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sunset Matches</Text>
      <Text style={styles.subheader}>RULES</Text>
      <View style={styles.rulesContainer}>
        <Rule text="Provide information truthfully about you" />
        <Rule text="Use the application with respect for others" />
        <Rule text="Report inappropriate behavior through the helpdesk" />
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={formik.handleSubmit as any}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#DAA520',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 20,
    color: '#DAA520',
    marginBottom: 20,
  },
  rulesContainer: {
    width: '100%',
  },
  rule: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ruleText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5, 
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DAA520',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#DAA520',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
