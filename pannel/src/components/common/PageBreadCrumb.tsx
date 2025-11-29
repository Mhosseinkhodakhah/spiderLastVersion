import { Link } from "react-router";

interface BreadcrumbProps {
  pageTitle: string;
  subMenu?: string | undefined;
  subTwoMenu?: string | undefined;
  subMenuLink ?: string | undefined
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  subMenu,
  subTwoMenu,
  subMenuLink,
}) => {
  return (
    <div className="flex flex-col juc flex-wrap items-start  gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5 mr-2">
          <li className="text-sm text-gray-800 dark:text-white/90">
            {pageTitle}
          </li>
          <li className="text-sm text-gray-800 dark:text-white/90">
            <svg
              className="stroke-current rotate-180"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                stroke=""
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </li>
          <Link to={subMenuLink ? subMenuLink : ''} className="text-sm text-gray-800 dark:text-white/90">
            {subMenu}
          </Link>
          {subTwoMenu && (
            <>
              <li className="text-sm text-gray-800 dark:text-white/90">
                <svg
                  className="stroke-current rotate-180"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
              <li className="text-sm text-gray-800 dark:text-white/90">
                {subTwoMenu}
              </li>
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
