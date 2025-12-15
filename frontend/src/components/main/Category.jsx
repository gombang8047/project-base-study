import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const CategoryItem = (props) => {
  const { name, icon: Icon, value, iconColor } = props;

  const colorMap = {
    green: "group-data-[state=active]:text-[#09aa5c]",
    blue: "group-data-[state=active]:text-[#3b82f6]",
    red: "group-data-[state=active]:text-[#ef4444]",
    yellow: "group-data-[state=active]:text-[#eab308]",
    purple: "group-data-[state=active]:text-[#a855f7]",
  };

  return (
    <TabsTrigger className="group font-bold" value={value}>
      {Icon && <Icon className={`mr-2 h-4 w-4 ${colorMap[iconColor]}`} />}
      {name}
    </TabsTrigger>
  );
};

export default CategoryItem;
