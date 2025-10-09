import { useEffect } from "react";
import { useRouter } from "next/router";

type WithAuthProps = {
  allowedRole: "admin" | "user";
};

export default function withAuth<P>(
  WrappedComponent: React.ComponentType<P>,
  { allowedRole }: WithAuthProps
) {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        router.replace("/auth/login");
        return;
      }

      const parsedUser = JSON.parse(currentUser);

      if (parsedUser.role !== allowedRole) {
        router.replace("/auth/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
