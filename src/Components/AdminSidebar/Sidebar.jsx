import React from 'react'
import { Link } from 'react-router-dom'
import {
  BsReverseLayoutSidebarReverse,
  BsBag,
  BsChatDots,
  BsCardList,
  BsEye,
  BsPencilSquare,
  BsReply,
  BsTools,
  BsPaypal,
  BsArrowBarLeft,
  BsLock,
  BsPerson,
} from 'react-icons/bs'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { FiActivity } from 'react-icons/fi'
import LinkItem from './LinkItem'
import { connect } from 'react-redux'
import { GrUserAdmin, GrCodeSandbox } from 'react-icons/gr'
import { FcMoneyTransfer } from 'react-icons/fc'

const accessMainList = [
  {
    title: 'Dashboard',
    url: '/admin-dashboard',
    icon: <BsReverseLayoutSidebarReverse />,
  },
  {
    title: 'User Type',
    url: '/user-type',
    icon: <BsBag />
  },
  {
    title: 'Program',
    url: '/program',
    icon: <BsEye />
  },
  {
    title: 'Users',
    url: '/users',
    icon: <BsCardList />,
    access: 'usersManagement',
  },
  {
    title: 'Committee',
    url: '/committee',
    icon: <BsChatDots />
  },
  {
    title: 'Wing',
    url: '/wing',
    icon: <BsPencilSquare />
  },
  {
    title: 'Post',
    url: '/post',
    icon: <BsReply />
  },
  {
    title: 'Student',
    url: '/student',
    icon: <BsPerson />
  },
  {
    title: 'Application',
    url: '/application',
    icon: <BsTools />
  }
]

function AdminSidebar({
  children,
  title,
  breadcrumb,
  buttonHref,
  buttonAction,
  buttonTitle,
  userType,
  headerComponent,
  user,
}) {
  const goBackToPreviousPage = () => {
    window.history.back()
  }
  const res = accessMainList.filter(
    (item) => user?.permission?.['usersManagement'],
  )
  console.log('res====', user?.permission?.accessList?.['usersManagement'])
  console.log('user====', user)
  return (
    <div className="relative w-full min-h-screen px-2 md:flex">
      <div className="absolute inset-y-0 left-0 w-48 px-2 space-y-6 text-blue-100 transition duration-200 ease-in-out transform -translate-x-full bg-gray-100 sidebar py-7 md:relative md:translate-x-0">
        <p key="weqqqw" className="pt-4 mb-0 text-2xl text-gray-900">
          IITS
        </p>
        <div className="mt-0" key="weqsqqw">
          {accessMainList
            // .filter(
            //   (item) =>
            //     user?.userType === 'super_admin' ||
            //     !item.access ||
            //     user?.permission?.accessList?.[item.access],
            // )
            .map((user, index) => (
              <LinkItem
                key={index + 'menuItems'}
                icon={user.icon}
                title={user.title}
                to={user.url}
              />
            ))}
        </div>

        <p key="weqcqqw" className="pt-4 mb-0 text-2xl text-gray-900">
          
        </p>
        <nav className="mt-0" key="weqdqqw"></nav>
      </div>

      <div
        key="weqqsqw"
        className="flex-1 w-full py-10 text-lg md:px-4 lg:px-10"
      >
        <nav
          key="weqqqwa"
          className="flex items-center justify-between p-4 text-sm text-left bg-white border border-gray-300 rounded-md h-14 text-grey-dark"
          role="alert"
        >
          <div className="flex mt-1 row">
            <div className="mr-6">
              <button onClick={() => goBackToPreviousPage()}>
                <BsArrowBarLeft size={36} color="blue" />
              </button>
            </div>
            <div>
              <p className="text-lg font-semibold leading-tight">{title}</p>
              <ol className="flex text-xs leading-tight text-gray-600 list-reset">
                {breadcrumb &&
                  breadcrumb.map((item, index) => (
                    <div className="flex flex-row" key={index + 23}>
                      {index !== breadcrumb.length - 1 ? (
                        <li>
                          <Link
                            key={`${index}breadcrumb`}
                            to={item.url}
                            className="font-bold"
                          >
                            {item.name}
                          </Link>
                          <span className="mx-1">/</span>
                        </li>
                      ) : (
                        <li key={`${index}breadcrumb`}>{item.name}</li>
                      )}
                    </div>
                  ))}
              </ol>
            </div>
          </div>
          <div className="flex items-center space-x-4" key="hdbs2ugu">
            {buttonHref && (
              <Link to={buttonHref} key="hdb2ugu">
                <button
                  key="updated23"
                  type="button"
                  className="px-2 py-1 text-sm font-bold text-white bg-blue-600 rounded hover:shadow"
                >
                  {buttonTitle}
                </button>
              </Link>
            )}
            {buttonAction && (
              <button
                key="updated24"
                type="button"
                className="px-2 py-1 text-sm font-bold text-white bg-blue-600 rounded hover:shadow"
                onClick={buttonAction}
              >
                {buttonTitle}
              </button>
            )}
          </div>
          {headerComponent ? headerComponent : null}
        </nav>
        {children}
      </div>
    </div>
  )
}

function mapStateToProps(state, props) {
  return {
    userType: state.mainReducers.main.userType,
    user: state.mainReducers.main.user,
  }
}

export default connect(mapStateToProps)(AdminSidebar)
