import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { Button } from "../ui/button";
import EmptyLinks from "./EmptyLinks";
import LinkCard from "./LinkCard";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { updateUserSocialLinks, addLink } from "@/features/user/userSlice";

function LinksContainer() {
  const { socialLinks } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = socialLinks.findIndex((item) => item.id === active.id);
      const newIndex = socialLinks.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(socialLinks, oldIndex, newIndex);

      dispatch(updateUserSocialLinks({ newOrder }));
    }
  };

  const handleAddNewLink = () => {
    if (socialLinks.length >= 5) return;
    dispatch(addLink());
  };

  const isEmpty = socialLinks.length === 0;

  return (
    <div className="xl:px-10 px-6">
      <Button
        disabled={socialLinks.length >= 5}
        onClick={handleAddNewLink}
        className="w-full h-[46px] mb-6 border border-main hover:bg-main-light text-main rounded-lg bg-white"
      >
        + Add new link
      </Button>
      {isEmpty && <EmptyLinks />}
      {!isEmpty && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={socialLinks.map((link) => link.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-main scrollbar-track-main-lgray flex flex-col gap-6 md:h-[31rem] h-[41rem]  overflow-y-auto">
              {socialLinks.map((link, index) => (
                <LinkCard
                  key={link.id}
                  id={link.id}
                  content={link}
                  number={index + 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
export default LinksContainer;
