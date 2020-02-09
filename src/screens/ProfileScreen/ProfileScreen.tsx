import React, {useContext} from 'react';
import {AuthContext} from '../../context/Auth';
import {UserEvents} from '../../components/UserEvents';

export const ProfileScreen = () => {
  const { firebaseUser } = useContext(AuthContext);
  console.log(`PROFILE SCREEN -- ${firebaseUser.uid}`);

  return (
    <UserEvents userId={firebaseUser.uid} />
  );
}
