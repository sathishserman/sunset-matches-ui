import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, increment, FieldValue } from 'firebase/firestore';
import {collection, query, where, getDocs } from 'firebase/firestore';

export const  calculateMatchScore =(user1:any, user2:any) =>{
    const sharedCommunities = user1.communities.filter((community:any) => user2.communities.includes(community)).length;
    const matchScore =  sharedCommunities;
    return matchScore;
}

export const recordSwipe = async (userId: any, targetUserId: any, swipeDirection: any): Promise<boolean> => {
    const today = new Date().toISOString().split('T')[0]; 
    const swipeLimitRef = doc(db, 'swipesLimit', userId);
  
    const swipeData = { 
        swipeDirection, 
        timestamp: serverTimestamp()
    };
    
    const userSwipesRef = doc(db, `user/${userId}/swipes/${targetUserId}`);

    const limitDocSnap = await getDoc(swipeLimitRef);
    if (!limitDocSnap.exists() || limitDocSnap.data().date !== today) {
        
        await setDoc(swipeLimitRef, {
            date: today,
            rightSwipesCount: swipeDirection === 'right' ? 1 : 0,
            leftSwipesCount: swipeDirection === 'left' ? 1 : 0,
            lastSwipeTime: serverTimestamp(),
        }, { merge: true });
    } else {
    
        const updates: { lastSwipeTime: FieldValue, rightSwipesCount?: FieldValue, leftSwipesCount?: FieldValue } = {
            lastSwipeTime: serverTimestamp(),
        };

        
        if (swipeDirection === 'right') {
            if (limitDocSnap.data().rightSwipesCount >= 10) {
                console.log('Daily right swipe limit reached');
                return false;
            } else {
                updates.rightSwipesCount = increment(1);
            }
        } else { 
            if (limitDocSnap.data().leftSwipesCount >= 10) {
                console.log('Daily left swipe limit reached');
                return false;
            } else {
                updates.leftSwipesCount = increment(1);
            }
        }

        await updateDoc(swipeLimitRef, updates);
    }

   
    await setDoc(userSwipesRef, swipeData);
    console.log(`Swipe recorded: ${userId} -> ${targetUserId} [${swipeDirection}]`);
    return true;
};



export const loadPotentialMatches = async (userId: string): Promise<any[]> => {
    const userDocRef = doc(db, 'user', userId); 
    const userDocSnap = await getDoc(userDocRef);
  
    if (!userDocSnap.exists()) {
      console.log('User not found');
      return [];
    }
  
    const userData = userDocSnap.data();
    const { communities } = userData;
  
    if (!communities?.length) {
      console.log('No communities defined for user');
      return [];
    }
  
    const usersRef = collection(db, 'user');
    const potentialMatchesQuery = query(usersRef, 
      where('communities', 'array-contains-any', communities)
    );
  
    const swipesRef = collection(db, `user/${userId}/swipes`);
    const swipesSnapshot = await getDocs(swipesRef);
    const swipedUserIds = swipesSnapshot.docs.map(doc => doc.id);
  
    const potentialMatchesSnapshot = await getDocs(potentialMatchesQuery);
    const matches = potentialMatchesSnapshot.docs
      .filter(doc => !swipedUserIds.includes(doc.id) && doc.id !== userId)
      .map(doc => doc.data());
  
    console.log(matches.length === 0 ? 'Ran out of users to show' : 'Matches found:', matches);
    return matches;
};


export const checkMutualRightSwipe = async (currentUserId: string, targetUserId: string): Promise<boolean> => {

    const currentUserSwipesRef = collection(db, `user/${currentUserId}/swipes`);
    const currentUserQuery = query(currentUserSwipesRef, where('targetUserID', '==', targetUserId), where('swipeDirection', '==', 'right'));
    const currentUserSwipesSnapshot = await getDocs(currentUserQuery);
  

    const targetUserSwipesRef = collection(db, `user/${targetUserId}/swipes`);
    const targetUserQuery = query(targetUserSwipesRef, where('targetUserID', '==', currentUserId), where('swipeDirection', '==', 'right'));
    const targetUserSwipesSnapshot = await getDocs(targetUserQuery);
  
    
    return !currentUserSwipesSnapshot.empty && !targetUserSwipesSnapshot.empty;
  };
  


  




