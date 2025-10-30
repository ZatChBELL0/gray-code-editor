import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import AddNewButton from "@/modules/dashboard/components/add-new";
import AddRepo from "@/modules/dashboard/components/add-repo";
import EmptyState from "@/modules/dashboard/components/empty-state";
import ProjectTable from "@/modules/dashboard/components/project-table";
import React from "react";

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  return (
    <div className="">
      <div className="">
        <AddNewButton />
        <AddRepo />
      </div>
      <div className="">
        {playgrounds && playgrounds.lenght === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTable
            projects={playgrounds || []}
            // onDeleteProject={() => {}}
            // onUpdateProject={() => {}}
            // onDuplicateProject={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
