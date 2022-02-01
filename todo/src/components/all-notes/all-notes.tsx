import * as React from 'react';

export interface IAllNotesProps {
}

export default function AllNotes (props: IAllNotesProps) {
  return (
    <div className="all-notes">
         <div className="notes">
        {
          // notes?.map((note)=>{
          //   return (
          //     <div>
          //       <li>{note.title}</li>
          //       <li>{note.note}</li>
          //       <li>{note.createdBy}</li>
          //       <li>{note.lastModified}</li>
          //       </div>
          //   )
          // })
        }
        </div>
        </div>
  );
}
