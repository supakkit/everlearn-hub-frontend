import { ChildrenPropType } from "@/types/common/childrenProp";

export function CentralScreenContainer({ children }: ChildrenPropType) {
  return (
    <div className="offset-top-bar min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
