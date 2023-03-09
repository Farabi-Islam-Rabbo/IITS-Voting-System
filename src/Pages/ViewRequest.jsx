import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
// import { PaperClipIcon } from "@heroicons/react/20/solid";
import {
  ButtonWithLoading,
  FileUploadField,
  InputField,
  MainWrapper,
  SelectField,
  Sidebar,
  TextAreaField,
  ComponentLoader,
  ConfirmDeleteModal,
  TableComponent,
} from '../Components'

import { Link, useParams } from 'react-router-dom'
import { UpdateReqStatus, GetRequestDetails } from '../Services/allService'
import moment from 'moment'
import { toast } from 'react-toastify'
import { countries } from '../Assets/_mocks/CountryList'

const breadcrumbs = [
  {
    id: 1,
    name: 'Dashboard',
    url: '/dashboard',
  },
  {
    id: 1,
    name: 'Users',
    url: '/users',
  },
  {
    id: 1,
    name: 'Create User',
    url: '/create-user',
  },
]

const statusList = [
  {
    label: 'Approve',
    value: 'approve',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Reject',
    value: 'reject',
  },
]
const languageList = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'Somali',
    value: 'somali',
  },
]

function ViewRequest({ user }) {
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [showRejectMessage, setShowRejectMessage] = useState(false)
  const [name, setName] = useState(null)
  let [requestStatus, setRequestStatus] = useState('')
  let [language, setLanguage] = useState(
    languageList.find((x) => x.value == 'english'),
  )
  let [rejectMessage, setRejectMessage] = useState('')
  let [reqDetails, setReqDetials] = useState({})

  useEffect(() => {}, [])

  const { id } = useParams()
  console.log('test', id)

  const formValiDation = (values) => {
    const errors = {}
    if (!values.title) errors.title = 'Title is Required'
    if (!values.courseType) errors.courseType = 'Please Select Course Type!'

    if (!values.coursePaymentType)
      errors.coursePaymentType = 'Please Select Course Payment Type!'

    if (!values.coursePaymentType)
      errors.coursePaymentType = 'Please Select Course Payment Mode!'
    if (!values.categories || values.categories.length < 1)
      errors.countryCode = 'Please Select Categories'

    if (!cover) errors.photoLoading = 'Please Upload a Course Cover!'

    if (photoLoading) errors.photoLoading = 'Photo is uploading, Please Wait!'
    if (values.coursePaymentType == 1 || values.coursePaymentType == 2) {
      if (!values.singleLessonPrice)
        errors.singleLessonPrice = 'Please add lesson Price'
    }
    if (values.coursePaymentType == 1 || values.coursePaymentType == 3) {
      if (!values.price) errors.price = 'Please full course price!'
    }
    return errors
  }

  const uploadPhoto = async (files) => {
    if (files[0]) {
      setPhotoLoading(true)
      let formData = new FormData()
      formData.append('file', files[0])
      formData.append('name', 'Instructor Photo')
      formData.append('active', true)

      const response = await uploadFile(formData)

      console.log(response)

      if (response?.isSuccess) {
        setCover(response.data?.request)
      }
      setPhotoLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!requestStatus) return
    if (requestStatus.value == 'reject' && !rejectMessage) return
    let dataForm = {
      status: requestStatus.value,
      rejectMessage,
      language: language.value,
    }
    setLoading(true)
    const res = await UpdateReqStatus(id, dataForm)
    const { data, message, status } = res
    if (status) {
      toast('Request Status Updated!', {
        type: 'success',
      })
      setTimeout(() => {
        navigate(`/user`)
      }, 1000)
      setLoading(false)
    } else {
      toast(message, {
        type: 'error',
      })
      setLoading(false)
    }
  }
  const getRequestDetails = async () => {
    setPageLoading(true)
    const response = await GetRequestDetails(id)

    console.log(response)

    if (response.status) {
      setRequestStatus(
        statusList.find((x) => x.value == response.data.request?.status),
      )
      setLanguage(
        languageList.find((x) => x.value == response.data.request?.language),
      )
      if (response.data.request?.status == 'reject') {
        setRejectMessage(response.data.request?.rejectMessage)
        setShowRejectMessage(true)
      }
      setReqDetials(response.data.request)
    }

    setPageLoading(false)
  }

  useEffect(() => {
    getRequestDetails()
  }, [])
  return (
    <MainWrapper>
      <Sidebar title="View Request" breadcrumb={breadcrumbs}>
        {pageLoading ? (
          <ComponentLoader height="300px" />
        ) : (
          <>
            <div className="flex flex-col md:flex-row w-full space-x-4">
              <div className="flex flex-col w-full md:w-4/5 px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
                <div className="flex items-center justify-between py-2 mb-4 border-b-2">
                  <span className="font-bold capitalize">Request Details</span>
                </div>
                <dl>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Sender Information
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Company:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.sendercompany}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Country:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {
                                countries.find(
                                  (item) =>
                                    item.value === reqDetails?.sendercountry,
                                )?.label
                              }
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              City:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.sendercity}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Receiver Information
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Company:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.receivercompany}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Country:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {
                                countries.find(
                                  (item) =>
                                    item.value === reqDetails?.receivercountry,
                                )?.label
                              }
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              City:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.receivercity}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Carrier Information
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Carrier ID:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.carrier?.carrierId}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Name:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.carrier?.carrierName}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Phone:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.carrier?.carrierPhone}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Email:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.carrier?.email}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              City:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.carrier?.carrierCity}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Country:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.carrier?.carrierCountry}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Others Information
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Status:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              <span
                                className={`text-center text-sm w-auto px-4 py-1 leading-5 font-bold capitalize rounded-full ${
                                  reqDetails?.status === 'approve'
                                    ? 'bg-green-100 text-green-800'
                                    : reqDetails?.status === 'reject'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {reqDetails?.status}
                              </span>
                            </span>
                          </div>
                        </li>
                        {reqDetails?.status == 'reject' ? (
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              {/* <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          /> */}
                              <span className="ml-2 w-0 flex-1 truncate">
                                Reason:
                              </span>
                              <span className="ml-2 w-0 flex-1 truncate">
                                {reqDetails.rejectMessage}
                              </span>
                            </div>
                          </li>
                        ) : null}
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Language:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.language.toUpperCase()}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Full Name:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.fname}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Phone No:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.phone}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Amount:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.amount?.toLocaleString()}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      User Information
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Name:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              <Link
                                to={`/update-user/${reqDetails?.user?._id}`}
                                // onClick={() => toggleUpdate(data)}
                                className="p-1 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-500"
                              >
                                {reqDetails?.user?.name}
                              </Link>
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Email:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.user?.email}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Account Type:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.user?.accountType.toUpperCase()}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                  {reqDetails?.reSubmit && (
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Re-Submit Information
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul
                          role="list"
                          className="divide-y divide-gray-200 rounded-md border border-gray-200"
                        >
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <span className="ml-2 w-0 flex-1 truncate">
                                Status:
                              </span>
                              <span className="ml-2 w-0 flex-1 truncate">
                                {reqDetails?.reSubmit ? 'RESUBMITTED' : ''}
                              </span>
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <span className="ml-2 w-0 flex-1 truncate">
                                Resubmitted at:
                              </span>
                              <span className="ml-2 w-0 flex-1 truncate">
                                {moment(reqDetails?.reSubmittedAt).format(
                                  'MMM DD YYYY h:mm A',
                                )}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="w-full md:w-1/5 mt-4">
                <div className="w-full bg-white rounded p-4">
                  <SelectField
                    required
                    label="Change Status"
                    placeholder="select to change"
                    value={requestStatus}
                    errorMessage={''}
                    onChange={(data) => {
                      if (data?.value == 'reject') {
                        setShowRejectMessage(true)
                      } else {
                        setShowRejectMessage(false)
                      }
                      setRequestStatus(data)
                    }}
                    selectOptions={statusList}
                    loading={false}
                  />

                  {requestStatus?.value === 'approve' && (
                    <SelectField
                      required
                      label="Select Language"
                      placeholder="select language"
                      value={language}
                      errorMessage={''}
                      onChange={(data) => {
                        setLanguage(data)
                      }}
                      selectOptions={languageList}
                      loading={false}
                    />
                  )}
                  {showRejectMessage && (
                    <TextAreaField
                      label={'Reject Message'}
                      placeholder={'reject message'}
                      value={rejectMessage}
                      onChange={(data) => setRejectMessage(data)}
                      row={4}
                    />
                  )}

                  <ButtonWithLoading
                    loading={loading}
                    className="p-2 w-full mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
                    title="Update Status"
                    onClick={() => handleSubmit()}
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </Sidebar>
    </MainWrapper>
  )
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  }
}

export default connect(mapStateToProps)(ViewRequest)
