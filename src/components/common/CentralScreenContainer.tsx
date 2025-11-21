import { ChildrenPropType } from "@/types/common/childrenProp";

export const CentralScreenContainer: React.FC<ChildrenPropType> = ({
  children,
}) => {
  return (
    <div className="offset-top-bar min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
};
