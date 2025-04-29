import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "../features/userSlice";
import { firebaseApp } from "../config/firebaseConfig";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("authToken", token);
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            fullName: firebaseUser.displayName || "",
          })
        );
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return null;
};

export default AuthInitializer;
