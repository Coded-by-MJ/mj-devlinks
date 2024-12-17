export const LockIcon = () => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5H9V3.5C9 2.70435 8.68393 1.94129 8.12132 1.37868C7.55871 0.81607 6.79565 0.5 6 0.5C5.20435 0.5 4.44129 0.81607 3.87868 1.37868C3.31607 1.94129 3 2.70435 3 3.5V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5ZM6.5 9.91438V11.5C6.5 11.6326 6.44732 11.7598 6.35355 11.8536C6.25979 11.9473 6.13261 12 6 12C5.86739 12 5.74021 11.9473 5.64645 11.8536C5.55268 11.7598 5.5 11.6326 5.5 11.5V9.91438C5.16639 9.79643 4.88522 9.56434 4.70618 9.25914C4.52715 8.95393 4.46177 8.59526 4.5216 8.24651C4.58144 7.89776 4.76264 7.58139 5.03317 7.35332C5.3037 7.12525 5.64616 7.00016 6 7.00016C6.35384 7.00016 6.6963 7.12525 6.96683 7.35332C7.23736 7.58139 7.41856 7.89776 7.4784 8.24651C7.53823 8.59526 7.47285 8.95393 7.29382 9.25914C7.11478 9.56434 6.83361 9.79643 6.5 9.91438ZM8 5H4V3.5C4 2.96957 4.21071 2.46086 4.58579 2.08579C4.96086 1.71071 5.46957 1.5 6 1.5C6.53043 1.5 7.03914 1.71071 7.41421 2.08579C7.78929 2.46086 8 2.96957 8 3.5V5Z"
        fill="#737373"
      />
    </svg>
  );
};

export const EmailIcon = () => {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-main-gray"
        d="M13 0H1C0.867392 0 0.740215 0.0526785 0.646447 0.146447C0.552678 0.240215 0.5 0.367392 0.5 0.5V9C0.5 9.26522 0.605357 9.51957 0.792893 9.70711C0.98043 9.89464 1.23478 10 1.5 10H12.5C12.7652 10 13.0196 9.89464 13.2071 9.70711C13.3946 9.51957 13.5 9.26522 13.5 9V0.5C13.5 0.367392 13.4473 0.240215 13.3536 0.146447C13.2598 0.0526785 13.1326 0 13 0ZM12.5 9H1.5V1.63688L6.66187 6.36875C6.75412 6.45343 6.87478 6.50041 7 6.50041C7.12522 6.50041 7.24588 6.45343 7.33813 6.36875L12.5 1.63688V9Z"
        fill="#737373"
      />
    </svg>
  );
};

export const LinkIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={className}
        d="M9.15391 12.6508C9.24131 12.7379 9.31065 12.8413 9.35797 12.9553C9.40529 13.0693 9.42965 13.1914 9.42965 13.3148C9.42965 13.4382 9.40529 13.5604 9.35797 13.6743C9.31065 13.7883 9.24131 13.8918 9.15391 13.9789L8.68985 14.4429C7.81049 15.3223 6.61782 15.8163 5.37422 15.8163C4.13062 15.8163 2.93795 15.3223 2.0586 14.4429C1.17924 13.5636 0.685219 12.3709 0.685219 11.1273C0.685219 9.88372 1.17924 8.69105 2.0586 7.81169L3.94297 5.9281C4.78788 5.0811 5.92467 4.58921 7.12049 4.55319C8.31631 4.51717 9.48064 4.93974 10.375 5.73435C10.4673 5.81642 10.5426 5.91588 10.5965 6.02705C10.6504 6.13821 10.6819 6.2589 10.6891 6.38223C10.6964 6.50556 10.6793 6.62911 10.6388 6.74582C10.5983 6.86254 10.5352 6.97014 10.4531 7.06247C10.3711 7.15481 10.2716 7.23007 10.1604 7.28397C10.0493 7.33787 9.92857 7.36934 9.80524 7.3766C9.68192 7.38385 9.55837 7.36675 9.44165 7.32625C9.32493 7.28576 9.21734 7.22267 9.125 7.1406C8.58869 6.66429 7.89065 6.4109 7.17369 6.43224C6.45672 6.45359 5.77499 6.74807 5.26797 7.25544L3.38516 9.13669C2.85763 9.66422 2.56126 10.3797 2.56126 11.1258C2.56126 11.8718 2.85763 12.5873 3.38516 13.1148C3.91269 13.6423 4.62818 13.9387 5.37422 13.9387C6.12026 13.9387 6.83575 13.6423 7.36328 13.1148L7.82735 12.6508C7.91441 12.5636 8.01781 12.4944 8.13162 12.4473C8.24543 12.4001 8.36742 12.3758 8.49063 12.3758C8.61383 12.3758 8.73582 12.4001 8.84963 12.4473C8.96344 12.4944 9.06684 12.5636 9.15391 12.6508ZM14.9414 1.557C14.0613 0.678998 12.8689 0.185913 11.6258 0.185913C10.3826 0.185913 9.19023 0.678998 8.31016 1.557L7.8461 2.02107C7.66998 2.19719 7.57103 2.43606 7.57103 2.68513C7.57103 2.9342 7.66998 3.17307 7.8461 3.34919C8.02222 3.52531 8.26109 3.62426 8.51016 3.62426C8.75923 3.62426 8.9981 3.52531 9.17422 3.34919L9.63828 2.88513C10.1658 2.3576 10.8813 2.06123 11.6273 2.06123C12.3734 2.06123 13.0889 2.3576 13.6164 2.88513C14.1439 3.41266 14.4403 4.12815 14.4403 4.87419C14.4403 5.62023 14.1439 6.33572 13.6164 6.86325L11.7328 8.74763C11.2253 9.25479 10.5432 9.54884 9.82609 9.56961C9.10894 9.59038 8.41097 9.33629 7.875 8.85935C7.78267 8.77727 7.67507 8.71419 7.55835 8.67369C7.44164 8.6332 7.31809 8.61609 7.19476 8.62335C7.07143 8.6306 6.95074 8.66208 6.83958 8.71597C6.72841 8.76987 6.62895 8.84514 6.54688 8.93747C6.4648 9.02981 6.40172 9.13741 6.36122 9.25412C6.32073 9.37084 6.30362 9.49439 6.31088 9.61772C6.31813 9.74104 6.3496 9.86173 6.4035 9.9729C6.4574 10.0841 6.53267 10.1835 6.625 10.2656C7.51874 11.06 8.68229 11.4829 9.87755 11.4476C11.0728 11.4123 12.2094 10.9215 13.0547 10.0758L14.9391 8.19216C15.8181 7.3123 16.3121 6.11957 16.3125 4.87585C16.3129 3.63212 15.8198 2.43905 14.9414 1.55857V1.557Z"
        fill="#633CFF"
      />
    </svg>
  );
};
export const ProfileIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={className}
        d="M8.5 0.5625C6.83122 0.5625 5.19992 1.05735 3.81238 1.98448C2.42484 2.9116 1.34338 4.22936 0.704766 5.77111C0.066152 7.31286 -0.100939 9.00936 0.224624 10.6461C0.550187 12.2828 1.35378 13.7862 2.53379 14.9662C3.71379 16.1462 5.21721 16.9498 6.85393 17.2754C8.49064 17.6009 10.1871 17.4338 11.7289 16.7952C13.2706 16.1566 14.5884 15.0752 15.5155 13.6876C16.4426 12.3001 16.9375 10.6688 16.9375 9C16.935 6.763 16.0453 4.61833 14.4635 3.03653C12.8817 1.45473 10.737 0.564981 8.5 0.5625ZM4.71641 14.357C5.15162 13.7619 5.72106 13.2779 6.37848 12.9442C7.0359 12.6106 7.76275 12.4367 8.5 12.4367C9.23725 12.4367 9.9641 12.6106 10.6215 12.9442C11.2789 13.2779 11.8484 13.7619 12.2836 14.357C11.1778 15.1412 9.85564 15.5625 8.5 15.5625C7.14435 15.5625 5.82221 15.1412 4.71641 14.357ZM6.3125 8.375C6.3125 7.94235 6.44079 7.51942 6.68116 7.15969C6.92153 6.79996 7.26317 6.51958 7.66288 6.35401C8.06259 6.18845 8.50243 6.14513 8.92676 6.22953C9.35109 6.31394 9.74087 6.52228 10.0468 6.8282C10.3527 7.13413 10.5611 7.52391 10.6455 7.94824C10.7299 8.37257 10.6866 8.81241 10.521 9.21212C10.3554 9.61183 10.075 9.95347 9.71531 10.1938C9.35558 10.4342 8.93265 10.5625 8.5 10.5625C7.91984 10.5625 7.36344 10.332 6.9532 9.9218C6.54297 9.51156 6.3125 8.95516 6.3125 8.375ZM13.6562 13.0578C13.0486 12.2849 12.2741 11.6595 11.3906 11.2281C11.9537 10.658 12.3355 9.93402 12.4881 9.14738C12.6408 8.36074 12.5573 7.54653 12.2484 6.80718C11.9394 6.06783 11.4187 5.43637 10.7517 4.99223C10.0847 4.5481 9.30131 4.31112 8.5 4.31112C7.69869 4.31112 6.91527 4.5481 6.24831 4.99223C5.58134 5.43637 5.06062 6.06783 4.75165 6.80718C4.44267 7.54653 4.35925 8.36074 4.51187 9.14738C4.66449 9.93402 5.04634 10.658 5.60938 11.2281C4.72591 11.6595 3.9514 12.2849 3.34375 13.0578C2.5805 12.0903 2.10511 10.9274 1.97199 9.70225C1.83887 8.47711 2.05341 7.23925 2.59104 6.13037C3.12867 5.02148 3.96766 4.08639 5.01199 3.43212C6.05631 2.77786 7.26375 2.43086 8.49609 2.43086C9.72844 2.43086 10.9359 2.77786 11.9802 3.43212C13.0245 4.08639 13.8635 5.02148 14.4011 6.13037C14.9388 7.23925 15.1533 8.47711 15.0202 9.70225C14.8871 10.9274 14.4117 12.0903 13.6484 13.0578H13.6562Z"
        fill="#737373"
      />
    </svg>
  );
};

export const LinkLine = () => {
  return (
    <svg
      width="12"
      height="6"
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="12" height="1" fill="#737373" />
      <rect y="5" width="12" height="1" fill="#737373" />
    </svg>
  );
};
